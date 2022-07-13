import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../lib/tailwind';

// TODO determine max and min height of bottom sheet and clamp it there

// from https://github.com/eveningkid/react-native-google-maps
// and https://www.youtube.com/watch?v=Z_dC5Mv99bI
export default function BottomSheet({
  children,
  style: contentStyle,
  minSheetHeight = 60 + 12,
  maxSheetHeight = 0,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  minSheetHeight?: number;
  maxSheetHeight?: number;
}) {
  const panY = useSharedValue(0);
  const { height } = useWindowDimensions();
  const bottomBarHeight = useBottomTabBarHeight();

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >(
    {
      onStart(_, context) {
        context.startY = panY.value;
      },
      onActive(event, context) {
        panY.value = context.startY + event.translationY;
      },
      onEnd() {
        console.debug(panY.value);
      },
    },
    [height]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(panY.value, [-1, 0], [-1, 0], {
            extrapolateLeft: Extrapolate.EXTEND,
            extrapolateRight: Extrapolate.CLAMP,
          }),
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          { top: height - bottomBarHeight - minSheetHeight },
          animatedStyle,
          tw`shadow-lg`,
        ]}
      >
        <SafeAreaView style={styles.wrapper} edges={['bottom', 'left', 'right']}>
          <View style={[styles.content, contentStyle]}>
            {children}
            <View style={styles.fakeContent} />
          </View>
        </SafeAreaView>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '400',
    fontSize: 22,
  },
  fakeContent: {
    flex: 1,
    height: 1000,
  },
});
