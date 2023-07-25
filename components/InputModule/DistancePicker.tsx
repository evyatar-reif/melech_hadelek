import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Counter from '../Counter';
import CheckBox from '../CheckBox';
import {drive} from '../../types';
type Props = {
  onSubmit: (d: drive) => void;
};

const DistancePicker = (props: Props) => {
  const {onSubmit} = props;
  const [count, setCount] = useState(10);
  const [city, setCity] = useState(true);

  return (
    <View style={{width: '100%', alignItems: 'center', gap: 10}}>
      <Counter unit={'ק"מ'} minValue={1} count={count} setCount={setCount} />
      <View style={styles.row}>
        <CheckBox value={city} onValueChange={v => setCity(v)} size={36} />
        <Text style={{fontSize: 20}}>נסיעה עירונית?</Text>
      </View>
      <Pressable
        style={styles.btn}
        onPress={() =>
          onSubmit({distance: count, type: city ? 'city' : 'highway'})
        }>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>
          חשב עלות
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
