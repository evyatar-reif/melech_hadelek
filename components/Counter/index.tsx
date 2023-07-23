import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import Minus from '../../assets/Minus';
import Plus from '../../assets/Plus';

type Props = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  minValue: number;
  unit: string;
};

const Counter = (props: Props) => {
  const {count, setCount, minValue, unit} = props;
  function add() {
    setCount((prev: any) => prev + 1);
  }
  function substract() {
    if (count <= minValue) return;
    setCount((prev: any) => prev - 1);
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={substract}>
        <Minus />
      </Pressable>
      <View style={styles.txt}>
        <Text style={{fontSize: 18}}>{unit}</Text>
        <TextInput
          style={{fontSize: 18}}
          keyboardType="numeric"
          value={`${count}`}
          onChangeText={v => {
            if (v != '') setCount(Number.parseInt(v.split(' ')[0]));
            else setCount(0);
          }}
        />
      </View>
      <Pressable style={styles.btn} onPress={add}>
        <Plus />
      </Pressable>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#000000BF',
    width: '80%',
    height: 64,
    borderRadius: 8,
  },
  btn: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#E1AD2B',
  },
  txt: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
