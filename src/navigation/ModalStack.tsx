import React from 'react';
import {SettingsScreen} from '../screens/settings/SettingsScreen';
import {CreativeStack} from './stacks/CreativeStack';
import {GameStack} from './stacks/GameStack';
import {LocationsStack} from './stacks/LocationsStack';
import {SessionsStack} from './stacks/SessionsStack';
import {AppRoute} from './types';

type ModalRoute = Exclude<AppRoute, {name: 'Home'}>;

export function ModalStack({route}: {route: ModalRoute}) {
  switch (route.name) {
    case 'SpotDetails':
    case 'AddSpot':
      return <LocationsStack route={route} />;
    case 'NewSession':
    case 'LiveSession':
      return <SessionsStack route={route} />;
    case 'GameSetup':
    case 'GamePlay':
      return <GameStack route={route} />;
    case 'Gallery':
      return <CreativeStack />;
    case 'Settings':
      return <SettingsScreen />;
  }
}
