import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'Remote debugger'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ec5353"/>
      <Routes />
    </>
  );
}
