import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabs} from '../components/BottomTabs';
import {DrawScreen} from '../screens/draw/DrawScreen';
import {GalleryScreen} from '../screens/draw/GalleryScreen';
import {GamePlayScreen} from '../screens/game/GamePlayScreen';
import {GameScreen} from '../screens/game/GameScreen';
import {GameSetupScreen} from '../screens/game/GameSetupScreen';
import {AddSpotScreen} from '../screens/locations/AddSpotScreen';
import {LocationsScreen} from '../screens/locations/LocationsScreen';
import {MapScreen} from '../screens/locations/MapScreen';
import {SpotDetailsScreen} from '../screens/locations/SpotDetailsScreen';
import {OnboardingScreen} from '../screens/onboarding/OnboardingScreen';
import {LiveSessionScreen} from '../screens/sessions/LiveSessionScreen';
import {NewSessionScreen} from '../screens/sessions/NewSessionScreen';
import {SessionsScreen} from '../screens/sessions/SessionsScreen';
import {SettingsScreen} from '../screens/settings/SettingsScreen';
import {useApp} from '../store/AppContext';

export function AppNavigator(){const {hydrated,onboarded,route,tab} = useApp(); if(!hydrated){return null;} if(!onboarded){return <OnboardingScreen/>;}
  if(route.name !== 'Home'){const Screens = {SpotDetails:SpotDetailsScreen,AddSpot:AddSpotScreen,NewSession:NewSessionScreen,LiveSession:LiveSessionScreen,GameSetup:GameSetupScreen,GamePlay:GamePlayScreen,Gallery:GalleryScreen,Settings:SettingsScreen}; const Current = Screens[route.name as keyof typeof Screens]; return Current ? <Current/> : null;}
  const Root = {Spots:LocationsScreen,Map:MapScreen,Sessions:SessionsScreen,Game:GameScreen,Draw:DrawScreen}[tab]; return <View style={styles.root}><Root/><BottomTabs/></View>;}
const styles = StyleSheet.create({root:{flex:1}});
