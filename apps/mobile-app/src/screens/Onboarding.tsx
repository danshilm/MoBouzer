import { FontAwesome } from '@expo/vector-icons';
import { coolDownAsync, warmUpAsync } from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Common/Button';
import OnboardingFooter from '../components/OnboardingFooter';
import SignInWithGoogleButton from '../components/SignInWithGoogleButton';
import tw from '../lib/tailwind';
import type { RootStackScreenProps } from '../navigation/types';

export default function Onboarding({ navigation }: RootStackScreenProps<'Onboarding'>) {
  useEffect(() => {
    warmUpAsync();

    return () => {
      coolDownAsync();
    };
  }, []);

  return (
    <SafeAreaView style={tw`px-6`}>
      <View style={tw`flex flex-col justify-between h-full`}>
        <View>
          {/* <Carousel> */}
          <View style={tw`w-full bg-gray-400 rounded-lg h-[410px] my-2`}></View>
          <View style={tw`flex flex-row justify-center mt-2`}>
            <View style={tw`w-2 h-2 mx-1 rounded-md bg-slate-600`}></View>
            <View style={tw`w-2 h-2 mx-1 rounded-md bg-slate-400`}></View>
            <View style={tw`w-2 h-2 mx-1 rounded-md bg-slate-400`}></View>
          </View>
          {/* Sign in buttons */}
          <View style={tw`mt-8`}>
            <Button style={tw`mb-5`} size="lg">
              <FontAwesome style={tw`mr-3 text-gray-800`} name="apple" size={20} />
              <Text style={tw`text-base text-gray-800 font-inter-medium`}>Continue With Apple</Text>
            </Button>
            <SignInWithGoogleButton />
            <Button
              onPress={() => navigation.push('SignIn')}
              style={tw`mb-5`}
              type="primary"
              size="lg"
            >
              <FontAwesome style={tw`mr-3 text-gray-100`} name="envelope-o" size={20} />
              <Text style={tw`text-base text-gray-100 font-inter-medium`}>Continue With Email</Text>
            </Button>
          </View>
        </View>
        <OnboardingFooter />
      </View>
    </SafeAreaView>
  );
}
