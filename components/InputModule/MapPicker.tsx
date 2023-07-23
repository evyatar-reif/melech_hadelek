import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Swap from '../../assets/Swap';

type Props = {};

const MapPicker = (props: Props) => {
  const [entry, setEntry] = useState({origin: '', destination: ''});

  function switchAddress() {
    const temp = {origin: entry.destination, destination: entry.origin};
    setEntry(temp);
  }
  return (
    <View style={{width: '100%', alignItems: 'center', gap: 10}}>
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
        <View style={{width: '80%'}}>
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
      <View style={styles.map}></View>
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
  },
});
