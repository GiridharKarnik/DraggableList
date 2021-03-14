import React from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

import useComponentSize, {ViewMeasurements} from './useComponentSize';
import Draggable from './Draggable';
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';
import {Positions} from './Config';

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

const DraggableList = () => {
  const scrollEnabled = useSharedValue<boolean>(false);
  const scrollRef: any = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const [size, onLayout]: [
    ViewMeasurements | undefined,
    any,
  ] = useComponentSize();

  const positions = useSharedValue<Positions>(
    Object.assign({}, ...data.map((colour, index) => ({[colour]: index}))),
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
    console.log(`scroll offset, ${scrollY.value}`);
  };

  // const onScroll = useAnimatedScrollHandler({
  //   onScroll: ({contentOffset: {y}}) => {
  //     scrollY.value = y;
  //   },
  // });

  return (
    <ScrollView
      ref={scrollRef}
      // style={styles.list}
      onScroll={onScroll}
      contentContainerStyle={{
        height: data.length * 100,
      }}
      onScrollBeginDrag={() => {
        console.log('scroll drag started');
        scrollEnabled.value = true;
      }}
      onScrollEndDrag={() => {
        console.log('scroll drag ended');
        scrollEnabled.value = false;
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      onLayout={onLayout}>
      {data.map((x, index) => {
        return (
          <Draggable
            // @ts-ignore
            size={size}
            dataSize={data.length}
            scrollRef={scrollRef}
            colour={x}
            key={x}
            index={index}
            scrollY={scrollY}
            positions={positions}
            scrollEnabled={scrollEnabled}
          />
        );
      })}
    </ScrollView>
  );
};

export default DraggableList;
