import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  step: number;
  setAddress: () => void;
  setDistance: () => void;
};

const Picker = (props: Props) => {
  const {step, setAddress, setDistance} = props;
  return (
    <View style={styles.container}>
      <Pressable
        onPress={setAddress}
        style={step == 0 ? styles.selected : styles.notSelected}>
        <Text style={{color: 'white', fontSize: 16}}>על פי כתובת</Text>
      </Pressable>
      <Pressable
        onPress={setDistance}
        style={step == 1 ? styles.selected : styles.notSelected}>
        <Text style={{color: 'white', fontSize: 16}}>על פי מרחק</Text>
      </Pressable>
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#000000BF',
    gap: 10,
    padding: 10,
    borderRadius: 8,
  },
  selected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1AD2B',
    borderRadius: 16,
    padding: 6,
    paddingHorizontal: 12,
  },
  notSelected: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    paddingHorizontal: 12,
  },
});
