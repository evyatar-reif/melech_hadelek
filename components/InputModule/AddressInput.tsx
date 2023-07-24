import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAutocomplete} from '../../utils/calc';

type Props = {
  value: string;
  onPress: () => void;
  onValueChange: (v: string) => void;
  placeHolder: string;
};

const AddressInput = (props: Props) => {
  const {value, onValueChange, placeHolder, onPress} = props;
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocomplete, setAutocomplete] = useState([]);

  let elms: any[] = [];

  if (autocomplete[0]) {
    elms = autocomplete.map((a, i) => (
      <Pressable
        key={`auto${i}`}
        onPress={() => {
          onValueChange(a.description);
          onPress();
          setShowAutocomplete(false);
        }}>
        <Text style={styles.row}>{a.description}</Text>
      </Pressable>
    ));
  }

  async function auto(v: string) {
    onValueChange(v);
    if (v.length <= 3) {
      setShowAutocomplete(false);
      return;
    }
    const a = await getAutocomplete(v);
    setShowAutocomplete(true);
    setAutocomplete(a);
  }
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        value={value}
        onChangeText={(v: string) => auto(v)}
      />
      {showAutocomplete && (
        <ScrollView nestedScrollEnabled={true} style={styles.autoContainer}>
          {elms}
        </ScrollView>
      )}
    </View>
  );
};

export default AddressInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 8,
    textAlign: 'right',
    paddingHorizontal: 12,
    height: 42,
    textAlignVertical: 'center',
  },
  autoContainer: {
    position: 'absolute',
    zIndex: 50,
    top: '110%',
    width: '100%',
    backgroundColor: 'white',
    height: 88,
    borderRadius: 8,
    borderWidth: 0.5,
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
  },
});
