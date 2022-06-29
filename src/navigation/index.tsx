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
import Colors from '../constants/Colors';
import { firebaseAuth } from '../firebase/config';
import useColorScheme from '../hooks/useColorScheme';
import useSettings from '../hooks/useSettings';
import tw from '../lib/tailwind';
import Loading from '../screens/Loading';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { RootStackParamList, RootTabParamList } from './types';

const MyDarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: tw.color('zinc-900') ?? 'rgb(24, 24, 27)',
  },
};

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? MyDarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
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
  const [user, loading] = useAuthState(firebaseAuth);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'default',
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
          <Stack.Screen name="Home" component={HomeTabNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function HomeTabNavigator() {
  const colorScheme = useColorScheme();
  const { settings, setSettings } = useSettings();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={() => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                setSettings({ ...settings, isDarkMode: !settings.isDarkMode });
                firebaseAuth.signOut();
              }}
              style={({ pressed }) => tw`${pressed ? 'opacity-50' : 'opacity-100'}`}
            >
              <Ionicons
                name="exit-outline"
                size={25}
                color={Colors[colorScheme].text}
                style={tw`mr-4`}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={tw`-mb-1`} {...props} />;
}
