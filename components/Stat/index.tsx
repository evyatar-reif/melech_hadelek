import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type props = {
  title: string;
  data: string;
};

const Stat = (props: props) => {
  const {title, data} = props;
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
};

export default Stat;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  data: {
    fontWeight: 'bold',
  },
});
