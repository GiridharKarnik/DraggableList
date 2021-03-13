import React, {
  ComponentType,
  MutableRefObject,
  Ref,
  RefObject,
  useRef,
} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {scrollTo} from 'react-native-reanimated';
import Draggable from './Draggable';

import useComponentSize from './useComponentSize';

const data = [
  '#02B9E3',
  '#1DAB1E',
  '#698C85',
  '#EB9042',
  '#528F4D',
  '#E777C0',
  '#6DDCDC',
  '#1FA79C',
  '#076C69',
  '#9CC278',
  '#D92749',
  '#3B8FD5',
  '#8FE4C5',
  '#AA1FB3',
  '#2FFCB2',
  '#AFE450',
  '#6CAFF0',
  '#CA7A00',
  '#C8EE81',
  '#9DFE94',
];

const DRAGGABLE_ITEM_HEIGHT = 100;

const DraggableList = () => {
  const scrollRef: any = useRef<Animated.ScrollView>();
  const currentScrollOffset = useRef<number>(0);

  const shouldScroll = useRef<boolean>(false);
  const [size, onLayout] = useComponentSize();

  const scrollStep = 50;
  const maxScrollOffset =
    data.length * DRAGGABLE_ITEM_HEIGHT - (size?.height || 0);

  console.log(`current offset ${size?.height}`);
  console.log(`maxScrollOffset ${maxScrollOffset}`);

  const scrollToTop = () => {
    if (!shouldScroll.current) {
      return;
    }

    console.log('scrolling to top');

    // 'worklet';
    // scrollTo(scrollRef, 0, 800, true);
    scrollRef.current.scrollTo({
      x: 0,
      y: currentScrollOffset.current - scrollStep,
      animated: false,
    });

    console.log(
      `maxScrollOffset : ${maxScrollOffset}, currentScrollOffset: ${currentScrollOffset.current}`,
    );

    if (currentScrollOffset.current <= 0) {
      shouldScroll.current = false;
    }

    requestAnimationFrame(() => {
      scrollToTop();
    });
  };

  const scrollToBottom = () => {
    if (!shouldScroll.current) {
      return;
    }

    console.log('scrolling to bottom');

    // 'worklet';
    // scrollTo(scrollRef, 0, 800, true);
    scrollRef.current.scrollTo({
      x: 0,
      y: currentScrollOffset.current + scrollStep,
      animated: false,
    });

    console.log(
      `maxScrollOffset : ${maxScrollOffset}, currentScrollOffset: ${currentScrollOffset.current}`,
    );
    if (currentScrollOffset.current >= maxScrollOffset) {
      shouldScroll.current = false;
    }

    requestAnimationFrame(() => {
      scrollToBottom();
    });
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(`offset ${event.nativeEvent.contentOffset.y}`);
    currentScrollOffset.current = event.nativeEvent.contentOffset.y;
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          shouldScroll.current = true;
          scrollToTop();
        }}>
        <Text>Scroll</Text>
      </TouchableOpacity>
      <ScrollView
        ref={scrollRef}
        style={styles.list}
        onScroll={onScroll}
        onLayout={onLayout}>
        {data.map((x) => {
          return <Draggable scrollRef={scrollRef} colour={x} key={x} />;
        })}
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'orange',
    height: 50,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    height: '100%',
    width: '100%',
  },
});

export default DraggableList;
