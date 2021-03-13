import React from 'react';
import {StyleSheet} from 'react-native';

import DraggableList from './DraggableList';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return <DraggableList />;
};

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
});

export default App;
