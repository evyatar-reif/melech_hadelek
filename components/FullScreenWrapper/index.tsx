import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

const FullScreenWrapper = (props: Props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default FullScreenWrapper;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 15,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
