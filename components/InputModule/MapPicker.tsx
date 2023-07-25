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
import {
  getGeolocation,
  getAddressFromGeometry,
  parseDrive,
} from '../../utils/calc';
import OriginPin from '../../assets/OriginPin.png';
import DestinationPin from '../../assets/DestinationPin.png';
import MapViewDirections from 'react-native-maps-directions';
import secret from '../../secret.json';
import {drive} from '../../types';

type Props = {
  onSubmit: (d: drive) => void;
};

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
  const {onSubmit} = props;
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
  const [drive, setDrive] = useState<drive>({distance: 10, type: 'city'});
  const mapRef = useRef(null);

  function switchAddress() {
    const temp = {origin: entry.destination, destination: entry.origin};
    setEntry(temp);
    updateDestinationMarker(entry.origin);
    updateOriginMarker(entry.destination);
  }

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

  async function updateOriginMarker(newValue: string) {
    try {
      if (newValue.length <= 3) return;
      const newGeo = await getGeolocation(newValue);
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

  async function updateDestinationMarker(newValue: string) {
    try {
      if (newValue.length <= 3) return;
      const newGeo = await getGeolocation(newValue);
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

  async function parseEntry() {
    if (!entry.origin || !entry.destination) return;
    onSubmit(drive);
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
            onPress={v => updateOriginMarker(v)}
          />
          <AddressInput
            placeHolder="כתובת יעד"
            value={entry.destination}
            onValueChange={v => {
              setEntry(prev => {
                return {...prev, destination: v};
              });
            }}
            onPress={v => updateDestinationMarker(v)}
          />
        </View>
      </View>

      <Pressable style={styles.btn} onPress={parseEntry}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>
          חשב עלות
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
            tappable
            onReady={i => {
              const d: drive = parseDrive(i.distance, i.duration);
              setDrive(d);
            }}
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
    height: 300,
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
