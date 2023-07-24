/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Counter from '../Counter';
import CheckBox from '../CheckBox';
import GasPriceTable from './GasPriceTable';

type Props = {};

const ResultModule = (props: Props) => {
  const [divider, setDivider] = useState(1);
  const [maam, setMaam] = useState(true);
  const [service, setService] = useState(true);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          textAlign: 'right',
          width: '80%',
          fontWeight: 'bold',
        }}>
        כמות נוסעים
      </Text>
      <Counter
        count={divider}
        setCount={setDivider}
        minValue={1}
        unit="נוסעים"
      />
      <Text
        style={{
          fontSize: 24,
          textAlign: 'right',
          width: '80%',
          fontWeight: 'bold',
        }}>
        מחיר
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}>
        <CheckBox value={service} onValueChange={setService} size={36} />
        <Text style={{fontSize: 20, textAlign: 'right'}}>שירות עצמי</Text>
        <CheckBox value={maam} onValueChange={setMaam} size={36} />
        <Text style={{fontSize: 20, textAlign: 'right'}}>עם מע"מ</Text>
      </View>
      <Pressable style={styles.btn}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>
          חשב מחיר
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            borderRadius: 8,
            borderWidth: 0.5,
            padding: 14,
            gap: 8,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>מחיר סופי</Text>
          <Text
            style={{
              backgroundColor: '#E1AD2B',
              color: 'white',
              fontSize: 24,
              width: '100%',
              borderRadius: 8,
              fontWeight: '500',
              padding: 8,
              textAlign: 'center',
            }}>{`₪ ${22}`}</Text>
        </View>
        <View
          style={{
            borderRadius: 8,
            borderWidth: 0.5,
            padding: 14,
            gap: 8,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>מחיר לנוסע</Text>
          <Text
            style={{
              backgroundColor: '#E1AD2B',
              color: 'white',
              fontSize: 24,
              width: '100%',
              borderRadius: 8,
              fontWeight: '500',
              padding: 8,
              textAlign: 'center',
            }}>{`₪ ${22}`}</Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 24,
          textAlign: 'right',
          width: '80%',
          fontWeight: 'bold',
        }}>
        מחירון דלק
      </Text>
      <GasPriceTable />
    </View>
  );
};

export default ResultModule;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAB83D',
    borderRadius: 8,
    height: 48,
    width: '80%',
  },
});
