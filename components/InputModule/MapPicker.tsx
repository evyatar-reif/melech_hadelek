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
import {getGeolocation} from '../../utils/calc';
import OriginPin from '../../assets/OriginPin.png';
import DestinationPin from '../../assets/DestinationPin.png';

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
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [geo, setGeo] = useState({
    origin: null,
    destination: null,
  });
  const mapRef = useRef(null);

  function switchAddress() {
    const temp = {origin: entry.destination, destination: entry.origin};
    setEntry(temp);
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

  useEffect(() => {
    updateOriginMarker();
    async function updateOriginMarker() {
      try {
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
  }, [entry.origin]);

  useEffect(() => {
    updateDestinationMarker();
    async function updateDestinationMarker() {
      try {
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
  }, [entry.destination]);

  async function changeFocus(latitude: string, longitude: string) {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
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
            onValueChange={v =>
              setEntry(prev => {
                return {...prev, origin: v};
              })
            }
          />
          <AddressInput
            placeHolder="כתובת יעד"
            value={entry.destination}
            onValueChange={v =>
              setEntry(prev => {
                return {...prev, destination: v};
              })
            }
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
            image={OriginPin}
            title="מוצא"
            pinColor="#0000ff"
            coordinate={{
              latitude: geo.origin.latitude,
              longitude: geo.origin.longitude,
            }}
          />
        )}
        {geo.destination && (
          <Marker
            image={DestinationPin}
            title="יעד"
            pinColor="#0000ff"
            coordinate={{
              latitude: geo.destination.latitude,
              longitude: geo.destination.longitude,
            }}
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
