import React, {useRef} from 'react';
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
} from 'react-native-reanimated';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const longPressRef = useRef();

  const transY = useSharedValue(0);

  const handleLongPress = ({
    nativeEvent,
  }: LongPressGestureHandlerGestureEvent) => {
    if (nativeEvent.state === State.ACTIVE) {
      Alert.alert("I'm being pressed for so long");
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

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: transY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.rowContainer, stylez]}>
        <LongPressGestureHandler
          ref={longPressRef}
          onHandlerStateChange={handleLongPress}>
          <View>
            <Text style={styles.text}>Draggable</Text>
          </View>
        </LongPressGestureHandler>
      </Animated.View>
    </PanGestureHandler>
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

export default App;
