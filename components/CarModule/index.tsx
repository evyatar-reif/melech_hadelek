/* eslint-disable prettier/prettier */
import {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet} from 'react-native';
import React from 'react';
import Open from './Open';
import Closed from './Closed';
import CarPicker from '../../screens/CarPicker';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CarModule = (props: Props) => {
  const {isOpen, setIsOpen} = props;
  const [isPicker, setIsPicker] = useState(false);

  if (isPicker) return <CarPicker setIsPicker={() => setIsPicker(false)} />;

  if (isOpen) return <Open setToPicker={() => setIsPicker(true)} />;

  return <Closed setIsOpen={setIsOpen} />;
};

export default CarModule;

const styles = StyleSheet.create({});
