import {StyleSheet, Text, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {useSelector} from 'react-redux';
import Car from '../../assets/Car';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Closed = (props: Props) => {
  const {setIsOpen} = props;
  const {settingsState} = useSelector(state => state);

  return (
    <Pressable onPress={() => setIsOpen(true)} style={styles.container}>
      <Car />
      <Text
        allowFontScaling={true}
        maxFontSizeMultiplier={2}
        style={{
          fontWeight: 'bold',
        }}>{`${settingsState.car.info.year} ${settingsState.car.info.make} ${settingsState.car.info.model}`}</Text>
    </Pressable>
  );
};

export default Closed;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    minHeight: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
