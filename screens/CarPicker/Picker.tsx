import {StyleSheet, View} from 'react-native';
import React from 'react';
import DropDownPicker from '../../components/DropDownPicker';
import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import {carInfo} from '../../types';
import {getItems} from '../../utils/car';

const defaultItems = {
  year: null,
  make: null,
  model: null,
};

type Props = {
  entry: carInfo;
  setEntry: Dispatch<SetStateAction<carInfo>>;
};

const Picker = (props: Props) => {
  const {entry, setEntry} = props;
  const [step, setStep] = useState(0);
  const [items, setItems] = useState(defaultItems);
  useEffect(() => {
    refreshItems();
    async function refreshItems() {
      const i = await getItems(step, entry);
      setItems(i);
    }
  }, [step, entry]);

  function goForward() {
    setStep(prev => prev + 1);
  }

  return (
    <View style={styles.container}>
      {
        <DropDownPicker
          disabled={step != 0}
          title="שנה"
          value={entry.year}
          onSelected={(v: string) => {
            goForward();
            setEntry(prev => {
              return {...prev, year: v};
            });
          }}
          items={items.year}
        />
      }
      {
        <DropDownPicker
          disabled={step != 1}
          title="יצרן"
          value={entry.make}
          onSelected={(v: string) => {
            goForward();
            setEntry(prev => {
              return {...prev, make: v};
            });
          }}
          items={items.make}
        />
      }
      {
        <DropDownPicker
          disabled={step != 2}
          title="מודל"
          value={entry.model}
          onSelected={(v: string) => {
            goForward();
            setEntry(prev => {
              return {...prev, model: v};
            });
          }}
          items={items.model}
        />
      }
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
