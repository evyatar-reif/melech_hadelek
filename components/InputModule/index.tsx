import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import DistancePicker from './DistancePicker';
import MapPicker from './MapPicker';
import Picker from './Picker';
import {drive} from '../../types';

type props = {
  onSubmit: (d: drive) => void;
};

const InputModule = (props: props) => {
  const {onSubmit} = props;
  const [step, setStep] = useState(0); // 0 is address, 1 is distance
  return (
    <View style={styles.container}>
      <Picker
        step={step}
        setAddress={() => setStep(0)}
        setDistance={() => setStep(1)}
      />
      {step == 0 ? (
        <MapPicker onSubmit={onSubmit} />
      ) : (
        <DistancePicker onSubmit={onSubmit} />
      )}
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
