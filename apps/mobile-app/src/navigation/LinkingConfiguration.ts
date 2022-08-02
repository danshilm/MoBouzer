/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions, PathConfig } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { BusLinesStackParamList, RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      HomeTab: {
        screens: {
          BusLinesStack: {
            screens: {
              BusLines: 'bus-lines',
              // id available in route.params.id as a string
              BusLineDetails: 'bus-lines/:id/:section',
            },
          } as PathConfig<BusLinesStackParamList>,
          Map: 'map',
          TabOne: 'tab-one',
        },
      },
      Modal: 'modal',
      Loading: 'loading',
      SignIn: 'signin',
      SignUp: 'signup',
      Onboarding: 'onboarding',
      NotFound: '*',
    },
  },
  filter: (url) => !url.includes('expo-auth-session'),
};

export default linking;
