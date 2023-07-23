/* eslint-disable react-native/no-inline-styles */
import {Button, StyleSheet, View, Text, Pressable} from 'react-native';
import React from 'react';
import FullScreenWrapper from '../FullScreenWrapper';
import {useSelector} from 'react-redux';
import PencilSvg from '../../assets/PencilSvg';
import Stat from '../Stat';

type Props = {
  setToPicker: () => void;
};

const Open = (props: Props) => {
  const {setToPicker} = props;
  const {settingsState} = useSelector(state => state);
  const car = settingsState.car;
  return (
    <FullScreenWrapper>
      <Pressable
        onPress={setToPicker}
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <PencilSvg />
        <Text style={{fontSize: 24}}>פרטי הרכב</Text>
      </Pressable>

      <View style={styles.container}>
        <View style={styles.row}>
          <Stat title="יצרן" data={settingsState.car.info.make} />
          <Stat title="שנה" data={settingsState.car.info.year} />
        </View>
        <View style={styles.row}>
          <Stat title="מזהה" data={settingsState.car.info.id} />
          <Stat title="מודל" data={settingsState.car.info.model} />
        </View>
        <View style={styles.row}>
          <Stat title='ק"מ\ליטר בעיר' data={settingsState.car.economy.city} />
          <Stat
            title='ק"מ\ליטר בכביש מהיר'
            data={settingsState.car.economy.highway}
          />
        </View>
      </View>
    </FullScreenWrapper>
  );
};

export default Open;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 0.5,
    width: 275,
    paddingHorizontal: 10,
  },
  row: {
    padding: 10,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});
