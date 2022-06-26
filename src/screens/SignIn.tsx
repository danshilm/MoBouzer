import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import Button from '../components/Common/Button';
import TextInput from '../components/Common/TextInput';
import OnboardingFooter from '../components/OnboardingFooter';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

export default function SignIn({ navigation }: RootStackScreenProps<'SignIn'>) {
  useDeviceContext(tw);

  return (
    <SafeAreaView style={tw`px-6`}>
      <View style={tw`flex flex-col justify-between h-full`}>
        <View>
          {/* Header */}
          <View style={tw`flex flex-row items-center h-10`}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.goBack()}
              style={tw`flex flex-row items-center`}
            >
              <AntDesign name="arrowleft" size={20} style={tw`text-gray-800 dark:text-gray-300`} />
              <Text style={tw`ml-2 text-base text-gray-800 font-inter-medium dark:text-gray-300`}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
          {/* Carousel-y image */}
          <View style={tw`w-full h-32 mt-6 bg-gray-400 rounded-xl`} />
          {/* Login form */}
          <View style={tw`mt-3`}>
            <TextInput label="Email address" as="email" placeholder="gandalf@tlotr.com" />
            <TextInput label="Password" as="password" placeholder="Thoushallnotpass123" />
            <Button
              style={tw`flex flex-row mt-3.5 bg-slate-800 border-slate-800`}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
            >
              <Text style={tw`text-base text-white font-inter-medium`}>Sign In</Text>
            </Button>
          </View>
        </View>
        <OnboardingFooter />
      </View>
    </SafeAreaView>
  );
}
