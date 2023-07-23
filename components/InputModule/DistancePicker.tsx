import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Counter from '../Counter';
import CheckBox from '../CheckBox';

type Props = {};

const DistancePicker = (props: Props) => {
  const [count, setCount] = useState(10);
  const [city, setCity] = useState(true);

  return (
    <View style={{width: '100%', alignItems: 'center', gap: 10}}>
      <Counter unit={'ק"מ'} minValue={1} count={count} setCount={setCount} />
      <View style={styles.row}>
        <CheckBox value={city} onValueChange={v => setCity(v)} size={46} />
        <Text style={{fontSize: 24}}>נסיעה עירונית?</Text>
      </View>
      <Pressable style={styles.btn}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>
          אישור
        </Text>
      </Pressable>
    </View>
  );
};

export default DistancePicker;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAB83D',
    borderRadius: 8,
    height: 48,
    width: '80%',
    marginBottom: 25,
  },
  row: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
