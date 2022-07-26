/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ColorSchemeName, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { firebaseAuth } from '../firebase/config';
import useSettings from '../hooks/useSettings';
import tw from '../lib/tailwind';
import BusLineDetails from '../screens/BusLineDetails';
import BusLines from '../screens/BusLines';
import Loading from '../screens/Loading';
import Map from '../screens/Map';
import ModalScreen from '../screens/ModalScreen';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import TabOneScreen from '../screens/TabOneScreen';
import LinkingConfiguration from './LinkingConfiguration';
import {
  BusLinesStackParamList,
  HomeTabParamList,
  HomeTabScreenProps,
  RootStackParamList,
} from './types';
import { navigationRef } from './utils';

const MyDarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: tw.color('zinc-900') ?? 'rgb(24, 24, 27)',
  },
};

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? MyDarkTheme : DefaultTheme}
        fallback={Loading()}
        ref={navigationRef}
      >
        <RootNavigator />
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
  const [user, loading] = useAuthState(
    firebaseAuth
    // 	, {
    //   onUserChanged: (user) => initialiseUserDocument(user),
    // }
  );

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
      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom', headerShown: true }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

function HomeTabNavigator() {
  const { settings, setSettings } = useSettings();

  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      screenOptions={{
        tabBarActiveTintColor: tw.color('slate-700'),
        tabBarStyle: tw`bg-white dark:bg-zinc-800`,
        headerStyle: tw`bg-white dark:bg-zinc-800`,
        headerTitleStyle: tw`dark:text-gray-100`,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: HomeTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                setSettings({ ...settings, isDarkMode: !settings.isDarkMode });
                // firebaseAuth.signOut();
                navigation.navigate('Modal');
              }}
              style={({ pressed }) => tw`${pressed ? 'opacity-50' : 'opacity-100'}`}
            >
              <Ionicons
                name="contrast-outline"
                size={25}
                color={tw.color('gray-800')}
                style={tw`mr-4`}
              />
            </Pressable>
          ),
        })}
      />
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

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} {...props} />;
}
