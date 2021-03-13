import {useState, useCallback} from 'react';

interface ViewMeasurements {
  y: number;
  x: number;
  width: number;
  height: number;
}

const useComponentSize = (): [ViewMeasurements | undefined, any] => {
  const [size, setSize] = useState<ViewMeasurements>();

  const onLayout = useCallback((event) => {
    // console.log(JSON.stringify(event.nativeEvent.layout));
    const {width, height, x, y} = event.nativeEvent.layout;
    setSize({width, height, x, y});
  }, []);

  return [size, onLayout];
};

export default useComponentSize;
