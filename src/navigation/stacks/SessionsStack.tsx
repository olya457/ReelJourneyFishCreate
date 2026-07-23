import React from 'react';
import {LiveSessionScreen} from '../../screens/sessions/LiveSessionScreen';
import {NewSessionScreen} from '../../screens/sessions/NewSessionScreen';
import {AppRoute} from '../types';

type SessionsRoute = Extract<AppRoute, {name: 'NewSession' | 'LiveSession'}>;

export function SessionsStack({route}: {route: SessionsRoute}) {
  return route.name === 'LiveSession' ? (
    <LiveSessionScreen route={route} />
  ) : (
    <NewSessionScreen />
  );
}
