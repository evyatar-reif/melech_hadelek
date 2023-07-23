import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SettingsModule from '../../components/SettingsModule';

type Props = {};

const HomeScreen = (props: Props) => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <View style={styles.container}>
      <SettingsModule isOpen={openSettings} setIsOpen={setOpenSettings} />
      <Pressable onPress={() => setOpenSettings(false)}>
        <Text>Arrow</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#113668',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
