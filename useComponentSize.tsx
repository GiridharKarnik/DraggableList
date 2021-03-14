import {useState, useCallback} from 'react';

export interface ViewMeasurements {
  y: number;
  x: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

const useComponentSize = (): [ViewMeasurements | undefined, any] => {
  const [size, setSize] = useState<ViewMeasurements>();

  const onLayout = useCallback((event) => {
    // console.log(JSON.stringify(event.nativeEvent.layout));
    // const {width, height, x, y,} = event.nativeEvent.layout;
    // setSize({width, height, x, y});

    if (event.target.measure) {
      event.target.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setSize({x, y, width, height, pageX, pageY});
        },
      );
    }

    // event.nativeEvent?.target?.measure((x, y, width, height, pageX, pageY) => {
    //   console.log({x, y, width, height, pageX, pageY});
    // });
  }, []);

  return [size, onLayout];
};

export default useComponentSize;
