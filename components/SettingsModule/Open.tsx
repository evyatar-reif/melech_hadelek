import {Button, StyleSheet, View} from 'react-native';
import React from 'react';
import FullScreenWrapper from '../FullScreenWrapper';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const Open = (props: Props) => {
  const navigation = useNavigation();
  return (
    <FullScreenWrapper>
      <View style={styles.container}>
        <Button
          title="חפש אוטו"
          onPress={() => navigation.navigate('CarPicker')}
        />
      </View>
    </FullScreenWrapper>
  );
};

export default Open;

const styles = StyleSheet.create({
  container: {},
});
