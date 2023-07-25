import {StyleSheet, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import FullScreenWrapper from '../../components/FullScreenWrapper';
import {car, carInfo} from '../../types';
import Picker from './Picker';
import Details from './Details';
import {useDispatch} from 'react-redux';
import {setUserCar} from '../../redux/settingsReducer';
import BackArrow from '../../assets/BackArrow';

const defaultCar: carInfo = {
  id: '',
  make: '',
  model: '',
  year: '',
};

type Props = {
  setIsPicker: () => void;
};

const CarPicker = (props: Props) => {
  const {setIsPicker} = props;
  const [entry, setEntry] = useState<carInfo>(defaultCar);
  const dispatch = useDispatch();
  async function onSubmit(car: car) {
    // console.log(car);
    dispatch(setUserCar(car));
    setIsPicker();
  }

  return (
    <FullScreenWrapper>
      <Pressable
        style={{
          alignItems: 'center',
        }}
        onPress={setIsPicker}>
        <BackArrow />
        <Text style={{fontSize: 24, marginBottom: 20}}>בחר רכב</Text>
      </Pressable>
      <Picker entry={entry} setEntry={setEntry} />
      <Details entry={entry} onSubmit={onSubmit} />
    </FullScreenWrapper>
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
