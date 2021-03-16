import React, {MutableRefObject, useRef} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {
  LongPressGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ViewMeasurements} from './useComponentSize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  animationConfig,
  getOrder,
  getPosition,
  Positions,
  SIZE,
} from './Config';

interface DraggableProps {
  scrollRef: MutableRefObject<any>;
  dataSize: number;
  positions: Animated.SharedValue<Positions>;
  colour: string;
  index: number;
  size: ViewMeasurements;
  scrollY: Animated.SharedValue<number>;
  scrollEnabled: Animated.SharedValue<boolean>;
}

const ROW_HEIGHT = 100;

interface DraggableHandle {
  translate: (translateBy: number) => void;
}

const Draggable: React.FC<DraggableProps> = ({
  scrollRef,
  dataSize,
  colour,
  index,
  scrollY,
  positions,
  scrollEnabled,
}) => {
  const longPressRef = useRef();
  const panRef = useRef();

  const beingDragged = useSharedValue<boolean>(false);

  const inset = useSafeAreaInsets();
  const containerHeight =
    Dimensions.get('window').height - inset.top - inset.bottom;
  const contentHeight = Object.keys(positions.value).length * SIZE;
  const isGestureActive = useSharedValue(false);

  const position = getPosition(positions.value[colour]!);
  const translateY = useSharedValue(position.y);

  useAnimatedReaction(
    () => positions.value[colour]!,
    (newOrder) => {
      if (!beingDragged.value) {
        const pos = getPosition(newOrder);
        translateY.value = withTiming(pos.y, animationConfig);
      }
    },
  );

  const panGestureEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {y: number}
  >({
    onStart: (_, context) => {
      context.y = translateY.value;
    },
    onActive: ({translationY}, ctx) => {
      if (beingDragged.value && !scrollEnabled.value) {
        translateY.value = ctx.y + translationY;
        // 1. We calculate where the tile should be
        const newOrder = getOrder(
          translateY.value,
          Object.keys(positions.value).length - 1,
        );

        // 2. We swap the positions
        const oldOlder = positions.value[colour];
        if (newOrder !== oldOlder) {
          const idToSwap = Object.keys(positions.value).find(
            (key) => positions.value[key] === newOrder,
          );
          if (idToSwap) {
            // Spread operator is not supported in worklets
            // And Object.assign doesn't seem to be working on alpha.6
            const newPositions = JSON.parse(JSON.stringify(positions.value));
            newPositions[colour] = newOrder;
            newPositions[idToSwap] = oldOlder;
            positions.value = newPositions;
          }
        }

        // 3. Scroll up and down if necessary
        const lowerBound = scrollY.value;
        const upperBound = lowerBound + containerHeight - SIZE;
        const maxScroll = contentHeight - containerHeight;
        const leftToScrollDown = maxScroll - scrollY.value;

        console.log(
          `maxScroll ${maxScroll}, leftToScrollDown ${leftToScrollDown}, upperBound ${upperBound}`,
        );

        console.log(`lowerBound ${lowerBound}`);
        console.log(`upperBound ${upperBound}`);

        if (translateY.value < lowerBound) {
          // console.log(`should scroll up`);
          const diff = Math.min(lowerBound - translateY.value, lowerBound);
          scrollY.value -= diff;
          scrollTo(scrollRef, 0, scrollY.value, true);
          ctx.y -= diff;
          translateY.value = ctx.y + translationY;
        }

        if (translateY.value > upperBound) {
          const diff = Math.min(
            translateY.value - upperBound,
            leftToScrollDown,
          );
          scrollY.value += diff;
          scrollTo(scrollRef, 0, scrollY.value, false);
          ctx.y += diff;
          translateY.value = ctx.y + translationY;
        }
      }
    },
    onEnd: () => {
      const newPosition = getPosition(positions.value[colour]!);
      translateY.value = withTiming(newPosition.y, animationConfig);
    },
  });

  const handleLongPress = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.ACTIVE) {
      beingDragged.value = true;
      // console.log('being dragged');
    } else if (
      nativeEvent.state === State.END ||
      nativeEvent.state === State.CANCELLED
    ) {
      beingDragged.value = false;
    }
  };

  const stylez = useAnimatedStyle(() => {
    const zIndex = beingDragged.value ? 99 : 0;
    const scale = withTiming(beingDragged.value ? 1.1 : 1);
    return {
      position: 'absolute',
      backgroundColor: colour,
      zIndex,
      transform: [
        {
          translateY: translateY.value,
        },
        {scale},
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.rowContainer, {backgroundColor: colour}, stylez]}>
      <PanGestureHandler
        ref={panRef}
        waitFor={[scrollRef]}
        simultaneousHandlers={[scrollRef, longPressRef]}
        onGestureEvent={panGestureEventHandler}>
        <Animated.View style={[StyleSheet.absoluteFill]}>
          <LongPressGestureHandler
            ref={longPressRef}
            simultaneousHandlers={panRef}
            maxDist={100000}
            shouldCancelWhenOutside={false}
            onHandlerStateChange={handleLongPress}>
            <Animated.View style={[StyleSheet.absoluteFill]}>
              <Text style={styles.text}>{index + 1}</Text>
            </Animated.View>
          </LongPressGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
});

export default Draggable;
