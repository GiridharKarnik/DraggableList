import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DraggableList from './src/DraggableList_lib/DraggableList';
import ExampleList from './src/Example';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <SafeAreaProvider>
      {/*<DraggableList_lib />*/}
      <ExampleList />
    </SafeAreaProvider>
  );
};

export default App;
