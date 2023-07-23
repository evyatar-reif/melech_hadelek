import {Button, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import FullScreenWrapper from '../FullScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

type Props = {};

const Open = (props: Props) => {
  const navigation = useNavigation();
  const {settingsState} = useSelector(state => state);
  console.log(settingsState.car.info.year);

  return (
    <FullScreenWrapper>
      <View>
        <Button
          title="בחר רכב"
          onPress={() => navigation.navigate('CarPicker')}
        />
        <Text style={{color: 'black', fontSize: 24}}>
          {settingsState.car.info.year}
        </Text>
      </View>
    </FullScreenWrapper>
  );
};

export default Open;

const styles = StyleSheet.create({});
