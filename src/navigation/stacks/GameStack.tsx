import React from 'react';
import {GamePlayScreen} from '../../screens/game/GamePlayScreen';
import {GameSetupScreen} from '../../screens/game/GameSetupScreen';
import {AppRoute} from '../types';

type GameRoute = Extract<AppRoute, {name: 'GameSetup' | 'GamePlay'}>;

export function GameStack({route}: {route: GameRoute}) {
  return route.name === 'GamePlay' ? (
    <GamePlayScreen route={route} />
  ) : (
    <GameSetupScreen />
  );
}
