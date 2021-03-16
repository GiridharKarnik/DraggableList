import {Easing} from 'react-native-reanimated';

export interface Positions {
  [id: string]: number;
}

export const MARGIN = 8;
export const SIZE = 100;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (position: number) => {
  'worklet';

  return {
    y: Math.floor(position) * SIZE,
  };
};

export const getOrder = (ty: number, max: number) => {
  'worklet';

  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  return Math.min(row, max);
};
