import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import {
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic,
} from '@expo-google-fonts/space-mono';
import { FontAwesome } from '@expo/vector-icons';
import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { getSettings } from '../lib/settings';
import Sentry from '../utils/sentry';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox');
        MapboxGL.setAccessToken(Constants.expoConfig?.extra?.mapboxToken);

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          SpaceMono_400Regular,
          SpaceMono_400Regular_Italic,
          SpaceMono_700Bold,
          SpaceMono_700Bold_Italic,
          Inter_100Thin,
          Inter_200ExtraLight,
          Inter_300Light,
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Inter_800ExtraBold,
          Inter_900Black,
        });

        // await clear();
        const settings = await getSettings().load();
        settings.publicSettings.isInitialised = true;
        await settings.save();
      } catch (e) {
        Sentry.Native.captureException(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
