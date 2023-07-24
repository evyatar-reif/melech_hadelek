import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPrice} from '../../utils/calc';

type Props = {};

const GasPriceTable = (props: Props) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    init();
    async function init() {
      const p = await getPrice();
      setPrice(p);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        <Text style={styles.text}>ללא שירות</Text>
        <Text style={styles.text}>עם שירות</Text>
        <Text style={styles.text}>------</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.text}>
          {price ? price.yesMaamNoService.PriceValue : '---'}₪
        </Text>
        <Text style={styles.text}>
          {price ? price.yesMaamYesService.PriceValue : '---'}₪
        </Text>
        <Text style={styles.text}>עם מע"מ</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.text}>
          {price ? price.noMaamNoService.PriceValue : '---'}₪
        </Text>
        <Text style={styles.text}>
          {price ? price.noMaamYesService.PriceValue : '---'}₪
        </Text>
        <Text style={styles.text}>ללא מע"מ</Text>
      </View>
    </View>
  );
};

export default GasPriceTable;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    gap: 15,
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  text: {
    textAlign: 'center',
    width: 65,
  },
});
