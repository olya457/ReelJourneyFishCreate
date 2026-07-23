import React, {useEffect, useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
export function FadeIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(16)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(y, {
        toValue: 0,
        delay,
        damping: 14,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, y]);
  return (
    <Animated.View style={[style, {opacity, transform: [{translateY: y}]}]}>
      {children}
    </Animated.View>
  );
}
