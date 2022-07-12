import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// from https://github.com/eveningkid/react-native-google-maps
// and https://www.youtube.com/watch?v=Z_dC5Mv99bI
export default function BottomSheet({
  panY,
  children,
}: {
  panY: SharedValue<number>;
  children: React.ReactNode;
}) {
  const { height } = useWindowDimensions();

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart(_, context: { startY: number }) {
        context.startY = panY.value;
      },
      onActive(event, context) {
        panY.value = context.startY + event.translationY;
      },
      onEnd() {
        if (panY.value < -height * 0.4) {
          panY.value = withTiming(-(height * 0.6));
        } else {
          panY.value = withTiming(0);
        }
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
      <Animated.View style={[styles.container, { top: height * 0.8 }, animatedStyle]}>
        <SafeAreaView style={styles.wrapper} edges={['bottom', 'left', 'right']}>
          <View style={styles.content}>
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
    shadowColor: 'black',
    shadowOffset: {
      height: -6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
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
