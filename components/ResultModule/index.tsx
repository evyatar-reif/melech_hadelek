/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Counter from '../Counter';
import CheckBox from '../CheckBox';
import GasPriceTable from './GasPriceTable';
import {drive, cost} from '../../types';
import {calcCost} from '../../utils/calc';
import {useSelector} from 'react-redux';

type Props = {
  drive: drive;
};

const ResultModule = (props: Props) => {
  const {drive} = props;
  const {settingsState} = useSelector(state => state);
  const [divider, setDivider] = useState(1);
  const [maam, setMaam] = useState(true);
  const [selfService, setSelfService] = useState(true);
  const [cost, setCost] = useState<cost | null>(null);

  function getDisplayCost() {
    if (!cost) return 0;
    if (maam && !selfService) return cost.yesMaamYesService.toFixed(2);
    if (maam && selfService) return cost.yesMaamNoService.toFixed(2);
    if (!maam && !selfService) return cost.noMaamYesService.toFixed(2);
    if (!maam && selfService) return cost.noMaamNoService.toFixed(2);
  }

  useEffect(() => {
    console.log(drive);
    init();
    async function init() {
      setCost(null);
      const c = await calcCost(
        drive.distance,
        settingsState.car.economy,
        drive.type,
      );
      console.log(c);
      setCost(c);
    }
  }, [drive, settingsState.car]);

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
        <CheckBox
          value={selfService}
          onValueChange={setSelfService}
          size={36}
        />
        <Text style={{fontSize: 20, textAlign: 'right'}}>שירות עצמי</Text>
        <CheckBox value={maam} onValueChange={setMaam} size={36} />
        <Text style={{fontSize: 20, textAlign: 'right'}}>עם מע"מ</Text>
      </View>
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
            }}>{`₪ ${getDisplayCost()}`}</Text>
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
            }}>{`₪ ${(getDisplayCost() / divider).toFixed(2)}`}</Text>
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
