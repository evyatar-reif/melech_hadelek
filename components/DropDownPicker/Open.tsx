import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  items: {text: string; value: string}[];
  onSelected: (v: string) => void;
  title: string;
};

const Open = (props: Props) => {
  const {items, onSelected, title} = props;

  const elms = items.map((i, index) => (
    <Pressable key={`${title}${index}`} onPress={() => onSelected(i.value)}>
      <Text style={styles.item}>{i.value}</Text>
    </Pressable>
  ));

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>{title}</Text>
      <ScrollView style={{height: 250}}>{elms}</ScrollView>
    </View>
  );
};

export default Open;

const styles = StyleSheet.create({
  container: {
    width: 275,
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 16,
  },
  item: {
    textAlign: 'right',
    fontSize: 16,
    padding: 12,
    borderBottomWidth: 0.5,
  },
});
