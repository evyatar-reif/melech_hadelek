import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FullScreenWrapper from '../../components/FullScreenWrapper';
import {car, carInfo} from '../../types';
import Picker from './Picker';
import Details from './Details';
import {useNavigation} from '@react-navigation/native';

const defaultCar: carInfo = {
  id: '',
  make: '',
  model: '',
  year: '',
};

type Props = {};

const CarPicker = (props: Props) => {
  const [entry, setEntry] = useState<carInfo>(defaultCar);
  const navigation = useNavigation();

  async function onSubmit(car: car) {
    // console.log(car);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <FullScreenWrapper>
        <Text>בחר רכב</Text>
        <Picker entry={entry} setEntry={setEntry} />
        {entry.model && <Details entry={entry} onSubmit={onSubmit} />}
      </FullScreenWrapper>
    </View>
  );
};

export default CarPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#113668',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
