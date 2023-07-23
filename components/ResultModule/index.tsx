import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const ResultModule = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>ResultModule</Text>
    </View>
  );
};

export default ResultModule;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 500,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
