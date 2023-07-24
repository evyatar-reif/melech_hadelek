/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  StyleSheet,
  ToastAndroid,
  View,
  PermissionsAndroid,
  Text,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Swap from '../../assets/Swap';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AddressInput from './AddressInput';
import {getGeolocation, getAddressFromGeometry} from '../../utils/calc';
import OriginPin from '../../assets/OriginPin.png';
import DestinationPin from '../../assets/DestinationPin.png';
import MapViewDirections from 'react-native-maps-directions';
import secret from '../../secret.json';

type Props = {};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const MapPicker = (props: Props) => {
  const [entry, setEntry] = useState({origin: '', destination: ''});
  const [userLocation, setUserLocation] = useState({
    latitude: 32,
    longitude: 32,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  });
  const [geo, setGeo] = useState({
    origin: null,
    destination: null,
  });
  const mapRef = useRef(null);

  function switchAddress() {
    const temp = {origin: entry.destination, destination: entry.origin};
    setEntry(temp);
    updateDestinationMarker();
    updateOriginMarker();
  }
  console.log('reload');
  useEffect(() => {
    init();

    async function init() {
      const isPermitted = await requestLocationPermission();
      if (!isPermitted) return;
      Geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, []);

  async function updateOriginMarker() {
    try {
      if (entry.origin.length <= 3) return;
      const newGeo = await getGeolocation(entry.origin);
      console.log(newGeo);
      setGeo(prev => {
        return {...prev, origin: newGeo};
      });
      changeFocus(newGeo.latitude, newGeo.longitude);
    } catch (err) {
      ToastAndroid.showWithGravity(
        'לא נמצאה כתובת',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }

  async function updateDestinationMarker() {
    try {
      if (entry.destination.length <= 3) return;

      const newGeo = await getGeolocation(entry.destination);
      setGeo(prev => {
        return {...prev, destination: newGeo};
      });
      changeFocus(newGeo.latitude, newGeo.longitude);
    } catch (err) {
      ToastAndroid.showWithGravity(
        'לא נמצאה כתובת',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }

  async function changeFocus(latitude: string, longitude: string) {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }
  async function updateDestinationMarkerDrag(coordinate: {
    latitude: string;
    longitude: string;
  }) {
    try {
      const newAddress = await getAddressFromGeometry(
        coordinate.latitude,
        coordinate.longitude,
      );
      console.log(newAddress);
      setEntry(prev => {
        return {...prev, destination: newAddress};
      });
      changeFocus(coordinate.latitude, coordinate.longitude);
      setGeo(prev => {
        return {...prev, destination: coordinate};
      });
    } catch (err) {}
  }

  async function updateOriginMarkerDrag(coordinate: {
    latitude: string;
    longitude: string;
  }) {
    try {
      const newAddress = await getAddressFromGeometry(
        coordinate.latitude,
        coordinate.longitude,
      );
      setEntry(prev => {
        return {...prev, origin: newAddress};
      });
      changeFocus(coordinate.latitude, coordinate.longitude);
      setGeo(prev => {
        return {...prev, origin: coordinate};
      });
    } catch (err) {}
  }
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        gap: 10,
        overflow: 'hidden',
        borderRadius: 25,
      }}>
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={switchAddress}
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Swap />
        </Pressable>
        <View style={{width: '80%', gap: 10}}>
          <AddressInput
            placeHolder="כתובת מוצא"
            value={entry.origin}
            onValueChange={v => {
              setEntry(prev => {
                return {...prev, origin: v};
              });
            }}
            onPress={updateOriginMarker}
          />
          <AddressInput
            placeHolder="כתובת יעד"
            value={entry.destination}
            onValueChange={v => {
              setEntry(prev => {
                return {...prev, destination: v};
              });
            }}
            onPress={updateDestinationMarker}
          />
        </View>
      </View>

      <Pressable style={styles.btn}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>
          אישור
        </Text>
      </Pressable>

      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        region={userLocation}>
        {geo.origin && (
          <Marker
            draggable
            image={OriginPin}
            title="מוצא"
            pinColor="#0000ff"
            coordinate={{
              latitude: geo.origin.latitude,
              longitude: geo.origin.longitude,
            }}
            onDragEnd={d => updateOriginMarkerDrag(d.nativeEvent.coordinate)}
          />
        )}
        {geo.destination && (
          <Marker
            draggable
            image={DestinationPin}
            title="יעד"
            pinColor="#0000ff"
            coordinate={{
              latitude: geo.destination.latitude,
              longitude: geo.destination.longitude,
            }}
            onDragEnd={d =>
              updateDestinationMarkerDrag(d.nativeEvent.coordinate)
            }
          />
        )}
        {geo.origin && geo.destination && (
          <MapViewDirections
            strokeWidth={5}
            origin={geo.origin}
            destination={geo.destination}
            apikey={secret.google_api_key}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapPicker;

const styles = StyleSheet.create({
  map: {
    backgroundColor: 'pink',
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: 350,
  },
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 8,
    textAlign: 'right',
    paddingHorizontal: 12,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAB83D',
    borderRadius: 8,
    height: 48,
    width: '80%',
  },
});
