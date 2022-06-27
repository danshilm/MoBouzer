import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import Button from '../components/Common/Button';
import OnboardingFooter from '../components/OnboardingFooter';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

export default function Onboarding({ navigation }: RootStackScreenProps<'Onboarding'>) {
  useDeviceContext(tw);

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
            <Button style={tw`mb-5`} type="default">
              <FontAwesome style={tw`mr-3 text-gray-800`} name="apple" size={20} />
              <Text style={tw`text-base text-gray-800 font-inter-medium`}>Continue With Apple</Text>
            </Button>
            <Button style={tw`mb-5`} type="default">
              <FontAwesome style={tw`mr-3 text-gray-800`} name="google" size={20} />
              <Text style={tw`text-base text-gray-800 font-inter-medium`}>
                Continue With Google
              </Text>
            </Button>
            <Button onPress={() => navigation.push('SignIn')} style={tw`mb-5`} type="primary">
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
