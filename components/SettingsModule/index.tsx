/* eslint-disable prettier/prettier */
import {Dispatch, SetStateAction} from 'react';
import {StyleSheet} from 'react-native';
import React from 'react';
import Open from './Open';
import Closed from './Closed';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SettingsModule = (props: Props) => {
  const {isOpen, setIsOpen} = props;

  if (isOpen) return <Open />;

  return <Closed setIsOpen={setIsOpen} />;
};

export default SettingsModule;

const styles = StyleSheet.create({});
