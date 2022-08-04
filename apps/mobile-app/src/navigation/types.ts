/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  HomeTab: NavigatorScreenParams<HomeTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Loading: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type HomeTabParamList = {
  Map: undefined;
  BusStops: undefined;
  BusLinesStack: NavigatorScreenParams<BusLinesStackParamList>;
  TabOne: undefined;
};

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type BusLinesStackParamList = {
  BusLines: undefined;
  BusLineDetails: { id: string; direction: 'forward' | 'reverse' };
};

export type BusLinesStackScreenProps<Screen extends keyof BusLinesStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<BusLinesStackParamList, Screen>,
    BottomTabScreenProps<HomeTabParamList>
  >;
