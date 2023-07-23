import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Crown from '../../assets/Crown';

type Props = {
  value: boolean;
  onValueChange: (v: boolean) => void;
  size: number;
};

const CheckBox = (props: Props) => {
  const {value, onValueChange, size} = props;

  if (value) {
    return (
      <Pressable
        style={{...styles.container, width: size, height: size}}
        onPress={() => onValueChange(!value)}>
        <Crown />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={{...styles.container, width: size, height: size}}
      onPress={() => onValueChange(!value)}></Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
  },
});
