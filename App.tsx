import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DraggableList from './DraggableList';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <SafeAreaProvider>
      <DraggableList />
    </SafeAreaProvider>
  );
};

export default App;
