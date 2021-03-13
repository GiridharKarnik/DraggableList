import React, {ComponentType, MutableRefObject, Ref, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Draggable from './Draggable';

const DraggableList = () => {
  const scrollRef: MutableRefObject<any> = useRef<any>();

  return (
    <ScrollView ref={scrollRef} style={styles.list}>
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
      <Draggable scrollRef={scrollRef} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    height: '100%',
    width: '100%',
  },
});

export default DraggableList;
