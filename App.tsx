import React from 'react';
import {StatusBar} from 'react-native';
import {AppNavigator} from './src/navigation/AppNavigator';
import {AppProvider} from './src/store/AppContext';

export default function App(): React.JSX.Element {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#071724" />
      <AppNavigator />
    </AppProvider>
  );
}
