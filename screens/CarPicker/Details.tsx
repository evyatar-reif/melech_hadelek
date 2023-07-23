import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {carInfo, car} from '../../types';
import {getCarInfo} from '../../utils/car';

type Props = {
  entry: carInfo;
  onSubmit: (c: car) => void;
};

const defaultInfo: car = {
  info: {id: '', year: '', make: '', model: ''},
  economy: {
    city: null,
    highway: null,
  },
};

const Details = (props: Props) => {
  const {entry, onSubmit} = props;
  const [car, setCar] = useState(defaultInfo);

  useEffect(() => {
    init();

    async function init() {
      const c = await getCarInfo(entry.year, entry.make, entry.model);
      console.log(c);
      setCar(c);
    }
  }, [entry]);

  return (
    <View>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'flex-end',
            borderBottomWidth: 0.5,
            gap: 10,
            padding: 10,
          }}>
          <Text style={{fontWeight: 'bold'}}>מזהה</Text>
          <Text>{car.info.id || '-'}</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            borderBottomWidth: 0.5,
            gap: 10,
            padding: 10,
          }}>
          <Text style={{fontWeight: 'bold'}}>ק"מ לליטר בכביש מהיר</Text>
          <Text>{car.economy.highway || '-'}</Text>
        </View>
        <View style={{alignItems: 'flex-end', gap: 10, padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>ק"מ לליטר בדרך עירונית</Text>
          <Text>{car.economy.city || '-'}</Text>
        </View>
      </View>
      {car.info.id && (
        <Pressable
          onPress={() => onSubmit(car)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EAB83D',
            borderRadius: 8,
            marginTop: 20,
            height: 48,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>
            אישור
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 16,
    borderWidth: 0.5,
    width: 275,
  },
});
