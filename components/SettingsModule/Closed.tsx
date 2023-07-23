import {StyleSheet, Text, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Closed = (props: Props) => {
  const {setIsOpen} = props;

  return (
    <Pressable onPress={() => setIsOpen(true)} style={styles.container}>
      <Text>2011 Ford Focus</Text>
    </Pressable>
  );
};

export default Closed;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
