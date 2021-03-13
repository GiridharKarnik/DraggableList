import React, {MutableRefObject, useRef} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerGestureEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface DraggableProps {
  scrollRef: MutableRefObject<any>;
  colour: string;
}

const Draggable: React.FC<DraggableProps> = ({scrollRef, colour}) => {
  const longPressRef = useRef();

  const beingDragged = useSharedValue<boolean>(false);

  const transY = useSharedValue(0);

  const handleLongPress = ({
    nativeEvent,
  }: LongPressGestureHandlerGestureEvent) => {
    if (nativeEvent.state === State.ACTIVE) {
      //   Alert.alert("I'm being pressed for so long");
    }
  };

  type AnimatedGHContext = {
    startY: number;
  };

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_, ctx) => {
      ctx.startY = transY.value;
    },
    onActive: (event, ctx) => {
      transY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {},
  });

  const longPressGestureHandler = useAnimatedGestureHandler<
    LongPressGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onActive: (event, ctx) => {
      beingDragged.value = true;
      //   transY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      beingDragged.value = false;
    },
    onCancel: () => {
      beingDragged.value = false;
    },
  });

  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: colour,
      zIndex: beingDragged.value ? 99 : 0,
      transform: [
        {
          translateY: transY.value,
        },
        {
          scale: withTiming(beingDragged.value ? 1.1 : 1),
        },
      ],
    };
  });

  return (
    <LongPressGestureHandler
      ref={longPressRef}
      onGestureEvent={longPressGestureHandler}
      maxDist={100000}
      shouldCancelWhenOutside={false}
      onHandlerStateChange={handleLongPress}>
      <Animated.View style={[styles.rowContainer, stylez]}>
        <Text style={styles.text}>Draggable</Text>
      </Animated.View>
    </LongPressGestureHandler>
  );
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

export default Draggable;
