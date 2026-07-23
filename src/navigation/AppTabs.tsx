import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabs} from '../components/BottomTabs';
import {DrawScreen} from '../screens/draw/DrawScreen';
import {GameScreen} from '../screens/game/GameScreen';
import {LocationsScreen} from '../screens/locations/LocationsScreen';
import {MapScreen} from '../screens/locations/MapScreen';
import {SessionsScreen} from '../screens/sessions/SessionsScreen';
import {useApp} from '../store/AppContext';
import {TabName} from './types';

const tabScreens: Record<TabName, React.ComponentType> = {
  Spots: LocationsScreen,
  Map: MapScreen,
  Sessions: SessionsScreen,
  Game: GameScreen,
  Draw: DrawScreen,
};

export function AppTabs() {
  const {tab} = useApp();
  const CurrentTab = tabScreens[tab];
  return (
    <View style={styles.root}>
      <CurrentTab />
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({root: {flex: 1}});
