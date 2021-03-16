import React, { ReactElement, useRef } from "react";
import {ScrollView} from 'react-native-gesture-handler';
import Draggable from './Draggable';
import {useAnimatedRef, useSharedValue} from 'react-native-reanimated';

interface DraggableListProps {
  children: Array<ReactElement<{id: string}>>;
}

const DraggableList: React.FC<DraggableListProps> = ({children}) => {
  const scrollEnabled = useSharedValue<boolean>(false);
  const scrollRef: any = useRef<ScrollView>();
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

  return (
    <ScrollView>
      {children.map((child) => {
        return <Draggable key={child.props.id}>{child}</Draggable>;
      })}
    </ScrollView>
  );
};

export default DraggableList;
