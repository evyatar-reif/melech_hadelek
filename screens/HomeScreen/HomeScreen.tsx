/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CarModule from '../../components/CarModule';
import InputModule from '../../components/InputModule';
import ResultModule from '../../components/ResultModule';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
import {drive} from '../../types';

const adIds = {
  BANNER: 'ca-app-pub-2066782014891536/9310909734',
  INTERSTITIAL: 'ca-app-pub-2066782014891536/6466088694',
};

type Props = {};

const HomeScreen = (props: props) => {
  const scrollRef = useRef(null);
  const [drive, setDrive] = useState<drive>({distance: 0, type: 'city'});
  const [openSettings, setOpenSettings] = useState(false);
  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    adIds.INTERSTITIAL,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fuel', 'car'],
    },
  );

  useEffect(() => {
    load();
  }, [load, isClosed]);

  useEffect(() => {
    if (isClosed) {
      if (!scrollRef.current) return;
      scrollRef.current.scrollToEnd({animated: true});
    }
  }, [isClosed]);

  async function onSubmit(d: drive) {
    setDrive(d);
    show();
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <CarModule isOpen={openSettings} setIsOpen={setOpenSettings} />
      <Pressable
        style={{
          width: '90%',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 25,
        }}
        onPress={() => setOpenSettings(false)}>
        <GAMBannerAd
          unitId={adIds.BANNER}
          sizes={[BannerAdSize.LARGE_BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            keywords: ['fuel', 'car'],
          }}
        />
      </Pressable>
      <Pressable
        style={{width: '100%', alignItems: 'center'}}
        onPress={() => setOpenSettings(false)}>
        <InputModule onSubmit={onSubmit} />
      </Pressable>
      <Pressable
        style={{width: '100%', alignItems: 'center'}}
        onPress={() => setOpenSettings(false)}>
        <ResultModule drive={drive} />
      </Pressable>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#113668',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 25,
  },
});
