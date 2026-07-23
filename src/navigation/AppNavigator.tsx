import React from 'react';
import {OnboardingScreen} from '../screens/onboarding/OnboardingScreen';
import {useApp} from '../store/AppContext';
import {AppTabs} from './AppTabs';
import {ModalStack} from './ModalStack';

export function AppNavigator() {
  const {hydrated, onboarded, route} = useApp();
  if (!hydrated) {
    return null;
  }
  if (!onboarded) {
    return <OnboardingScreen />;
  }
  return route.name === 'Home' ? <AppTabs /> : <ModalStack route={route} />;
}
