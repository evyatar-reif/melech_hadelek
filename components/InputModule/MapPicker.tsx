/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  PermissionsAndroid,
  Text,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Swap from '../../assets/Swap';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

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
  const mapRef = useRef(null);

  function switchAddress() {
    const temp = {origin: entry.destination, destination: entry.origin};
    setEntry(temp);
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
          <TextInput
            style={styles.input}
            placeholder="בחר נקודת התחלה"
            value={entry.origin}
            onChangeText={v =>
              setEntry(prev => {
                return {...prev, origin: v};
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="בחר יעד"
            value={entry.destination}
            onChangeText={v =>
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
        region={userLocation}
      />
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
