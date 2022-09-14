import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import type { HomeTabParamList } from '../navigation/types';

/**
 * Do something when pressing the bottom tab icon the second time
 * @param screenName name of the screen that's in the root stack
 * @param callback function to run on second bottom tab press
 */
const useSecondBottomTabPress = (screenName: keyof HomeTabParamList, callback: () => void) => {
  // not sure why the composite nav prop type indicates the nav supposedly
  // doesn't emit the tabPress event; it certainly does
  const navigation = useNavigation<BottomTabNavigationProp<HomeTabParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', async () => {
      const navState = navigation.getState();

      if (navState.index < navState.history.length) {
        const isSecondTabPress = navState.history[navState.index].key.includes(screenName);

        if (isSecondTabPress) {
          callback();
        }
      }
    });

    return unsubscribe;
  }, [callback, navigation, screenName]);
};

export default useSecondBottomTabPress;
