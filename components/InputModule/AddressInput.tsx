import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Pressable,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getAutocomplete} from '../../utils/calc';
import Geolocation from 'react-native-geolocation-service';
import {getAddressFromGeometry} from '../../utils/calc';

type Props = {
  value: string;
  onPress: (v: string) => void;
  onValueChange: (v: string) => void;
  placeHolder: string;
};

const AddressInput = (props: Props) => {
  const {value, onValueChange, placeHolder, onPress} = props;
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocomplete, setAutocomplete] = useState([]);
  const [userAddress, setUserAdderss] = useState('');

  let elms: any[] = [
    <Pressable
      key={'location'}
      onPress={async () => {
        onValueChange(userAddress);
        onPress(userAddress);
        setShowAutocomplete(false);
      }}>
      <Text style={styles.row}>מיקום נוכחי</Text>
    </Pressable>,
  ];

  if (autocomplete[0]) {
    elms.push(
      autocomplete.map((a, i) => (
        <Pressable
          key={`auto${i}`}
          onPress={async () => {
            await Keyboard.dismiss();
            onValueChange(a.description);
            onPress(a.description);
            setShowAutocomplete(false);
          }}>
          <Text style={styles.row}>{a.description}</Text>
        </Pressable>
      )),
    );
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async ({coords}) => {
        const a = await getAddressFromGeometry(
          coords.latitude,
          coords.longitude,
        );
        setUserAdderss(a);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

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
