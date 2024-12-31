import React, {ReactNode, useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {ViewStyle} from 'react-native';

export const AnimationView: React.FC<{
  children: ReactNode | ReactNode[];
  styles?: ViewStyle;
  side: 'left' | 'right';
}> = ({children, styles, side}) => {
  const translateX = useSharedValue(side === 'left' ? -411 : 411);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(translateX.value, {duration: 1000})}],
    };
  });
  useEffect(() => {
    translateX.value = 0;
  }, []);
  return (
    <Animated.View style={{...animatedStyle, ...styles}}>
      {children}
    </Animated.View>
  );
};
