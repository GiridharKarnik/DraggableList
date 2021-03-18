import React from 'react';
import ExampleList from './src/Example';
import {SafeAreaProvider} from 'react-native-safe-area-context';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <SafeAreaProvider>
      <ExampleList />
    </SafeAreaProvider>
  );
};

export default App;
