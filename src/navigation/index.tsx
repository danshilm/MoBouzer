/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Platform, Pressable, StatusBar } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import useSettings from '../hooks/useSettings';
import tw from '../lib/tailwind';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from './types';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
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
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'default',
        contentStyle: tw.style(
          Platform.OS === 'ios' ? 'pt-10' : `pt-[${StatusBar.currentHeight ?? 0}px]`,
          'px-6'
        ),
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      {/* Sign Up */}
      <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
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
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Modal');
                setSettings({ ...settings, isDarkMode: !settings.isDarkMode });
              }}
              style={({ pressed }) => tw`${pressed ? 'opacity-50' : 'opacity-100'}`}
            >
              <FontAwesome
                name="info-circle"
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
