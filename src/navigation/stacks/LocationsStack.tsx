import React from 'react';
import {AddSpotScreen} from '../../screens/locations/AddSpotScreen';
import {SpotDetailsScreen} from '../../screens/locations/SpotDetailsScreen';
import {AppRoute} from '../types';

type LocationsRoute = Extract<AppRoute, {name: 'SpotDetails' | 'AddSpot'}>;

export function LocationsStack({route}: {route: LocationsRoute}) {
  return route.name === 'SpotDetails' ? (
    <SpotDetailsScreen route={route} />
  ) : (
    <AddSpotScreen />
  );
}
