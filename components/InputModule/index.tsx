import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import DistancePicker from './DistancePicker';
import MapPicker from './MapPicker';
import Picker from './Picker';

const InputModule = () => {
  const [step, setStep] = useState(0); // 0 is address, 1 is distance

  return (
    <View style={styles.container}>
      <Picker
        step={step}
        setAddress={() => setStep(0)}
        setDistance={() => setStep(1)}
      />
      {step == 0 ? <MapPicker /> : <DistancePicker />}
    </View>
  );
};

export default InputModule;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    gap: 10,
    width: '90%',
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
