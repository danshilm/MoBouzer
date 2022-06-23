import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../components/Common/Button';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

export default function Onboarding({ navigation }: RootStackScreenProps<'Onboarding'>) {
  return (
    <>
      <View style={tw`flex flex-col justify-between h-full`}>
        <View>
          {/* <Carousel> */}
          <View style={tw`w-full bg-gray-400 rounded-lg h-[410px] mt-7`}></View>
          <View style={tw`flex flex-row justify-center mt-4`}>
            <View style={tw`w-2 h-2 mx-1 rounded-md bg-slate-600`}></View>
            <View style={tw`w-2 h-2 mx-1 rounded-md bg-slate-400`}></View>
            <View style={tw`w-2 h-2 mx-1 rounded-md bg-slate-400`}></View>
          </View>
          {/* Sign in buttons */}
          <View style={tw`mt-8`}>
            <Button style={tw`flex flex-row mb-5 bg-white border-slate-300`}>
              <FontAwesome style={tw`mr-3 text-gray-700`} name="apple" size={20} />
              <Text style={tw`text-base text-gray-700 font-inter-medium`}>Continue With Apple</Text>
            </Button>
            <Button style={tw`mb-5 bg-white border-slate-300`}>
              <FontAwesome style={tw`mr-3 text-gray-700`} name="google" size={20} />
              <Text style={tw`text-base text-gray-700 font-inter-medium`}>
                Continue With Google
              </Text>
            </Button>
            <Button
              onPress={() => navigation.push('SignIn')}
              style={tw`flex flex-row mb-5 bg-slate-800 border-slate-800`}
            >
              <FontAwesome style={tw`mr-3 text-white`} name="envelope-o" size={20} />
              <Text style={tw`text-base text-white font-inter-medium`}>Continue With Email</Text>
            </Button>
          </View>
        </View>
        <View style={tw`flex flex-row justify-center mb-8`}>
          <Text style={tw`text-gray-700`}>Terms of Use</Text>
          <Text style={tw`mx-3`}>|</Text>
          <Text style={tw`text-gray-700`}>Privacy Policy</Text>
        </View>
      </View>
    </>
  );
}
