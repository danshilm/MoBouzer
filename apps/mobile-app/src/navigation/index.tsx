import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { Theme } from '@react-navigation/native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ErrorBoundary } from '@sentry/react-native';
import { SessionContextProvider, useUser } from '@supabase/auth-helpers-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { ColorSchemeName } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { slate, zinc } from 'tailwindcss/colors';
import Error from '../components/Error';
import { supabase } from '../lib/supabase';
import tw from '../lib/tailwind';
import BusLineDetails from '../screens/BusLineDetails';
import BusLines from '../screens/BusLines';
import Loading from '../screens/Loading';
import Map from '../screens/Map';
import NotFound from '../screens/NotFound';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Sentry from '../utils/sentry';
import LinkingConfiguration from './LinkingConfiguration';
import type { BusLinesStackParamList, HomeTabParamList, RootStackParamList } from './types';
import { navigationRef } from './utils';

const MyDarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: zinc[900],
  },
};

export const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? MyDarkTheme : DefaultTheme}
        fallback={<Loading />}
        ref={navigationRef}
        onReady={() => {
          routingInstrumentation.registerNavigationContainer(navigationRef);
        }}
      >
        <ErrorBoundary fallback={<Error />}>
          <SessionContextProvider supabaseClient={supabase}>
            <RootNavigator />
          </SessionContextProvider>
        </ErrorBoundary>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  // everything under one navigator so screen transitions happen smoothly
  // https://reactnavigation.org/docs/auth-flow/
  const [loading, setLoading] = useState(true);

  const user = useUser();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}
    >
      {loading ? (
        <Stack.Screen name="Loading" component={Loading} />
      ) : !user ? (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
        </>
      )}
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

function HomeTabNavigator() {
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      screenOptions={{
        tabBarActiveTintColor: slate[700],
        tabBarStyle: tw.style(`bg-white dark:bg-zinc-800`, !bottom && `pb-2 h-16`),
        headerStyle: tw`bg-white dark:bg-zinc-800`,
        headerTitleStyle: tw`dark:text-gray-100`,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="BusLinesStack"
        component={BusLinesNavigator}
        options={{
          tabBarLabel: 'Bus Lines',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'document-text' : 'document-text-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const BusLinesStack = createNativeStackNavigator<BusLinesStackParamList>();

function BusLinesNavigator() {
  return (
    <BusLinesStack.Navigator
      screenOptions={{ animation: 'slide_from_right', headerShown: false }}
      // initialRouteName="BusLineDetails"
    >
      <BusLinesStack.Screen name="BusLines" component={BusLines} />
      <BusLinesStack.Screen
        name="BusLineDetails"
        component={BusLineDetails}
        initialParams={{ id: '0', direction: 'forward' }}
      />
    </BusLinesStack.Navigator>
  );
}
