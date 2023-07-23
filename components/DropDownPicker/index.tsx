import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PencilSvg from '../../assets/PencilSvg';
import Open from './Open';

type Props = {
  title: string;
  value: string;
  items: {text: string; value: string}[];
  onSelected: (v: string) => void;
  disabled?: boolean;
};

const DropDownPicker = (props: Props) => {
  const {value, items, onSelected, title, disabled} = props;
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <Open
        title={title}
        items={items}
        onSelected={(v: string) => {
          setIsOpen(false);
          onSelected(v);
        }}
      />
    );
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (!disabled) setIsOpen(true);
      }}>
      {!disabled && <PencilSvg />}
      <View>
        <Text style={{fontSize: 16}}>{value == '' ? title : value} </Text>
        {!disabled && (
          <Text style={{fontWeight: 'bold', fontSize: 16}}>לחץ לבחירה</Text>
        )}
      </View>
      {disabled && <Text style={{fontWeight: 'bold'}}>{title}</Text>}
    </Pressable>
  );
};

export default DropDownPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 16,
    width: 275,
  },
});
