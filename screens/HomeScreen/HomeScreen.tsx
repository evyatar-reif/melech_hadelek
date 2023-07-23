import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CarModule from '../../components/CarModule';
import InputModule from '../../components/InputModule';
import ResultModule from '../../components/ResultModule';

type Props = {};

const HomeScreen = (props: Props) => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <ScrollView
      style={{width: '100%'}}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <View style={styles.container}>
        <CarModule isOpen={openSettings} setIsOpen={setOpenSettings} />
        <Pressable
          style={{width: '100%', alignItems: 'center'}}
          onPress={() => setOpenSettings(false)}>
          <InputModule />
        </Pressable>
        <Pressable
          style={{width: '100%', alignItems: 'center'}}
          onPress={() => setOpenSettings(false)}>
          <ResultModule />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#113668',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 25,
  },
});
