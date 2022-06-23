import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Common/Button';
import TextInput from '../components/Common/TextInput';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

export default function SignIn({ navigation }: RootStackScreenProps<'SignIn'>) {
  return (
    <View style={tw`flex flex-col justify-between h-full`}>
      <View style={tw``}>
        {/* Header */}
        <View style={tw`flex flex-row items-center h-10`}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
            style={tw`flex flex-row items-center`}
          >
            <AntDesign name="arrowleft" size={20} style={tw`ml-1`} />
            <Text style={tw`ml-2 text-base font-inter-medium`}>Back</Text>
          </TouchableOpacity>
        </View>
        {/* Carousel-y image */}
        <View style={tw`w-full h-32 mt-6 bg-gray-400 rounded-xl`}></View>
        {/* Login form */}
        <View style={tw`mt-3`}>
          <TextInput
            label="Email address"
            textContentType="emailAddress"
            autoCompleteType="email"
            placeholder="gandalf@tlotr.com"
          />
          <TextInput
            label="Password"
            textContentType="password"
            autoCompleteType="password"
            secureTextEntry={true}
            placeholder="Thoushallnotpass123"
          />
          <Button
            style={tw`flex flex-row mt-3.5 bg-slate-800 border-slate-800`}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
          >
            <Text style={tw`text-base text-white font-inter-medium`}>Sign In</Text>
          </Button>
        </View>
      </View>
      <View style={tw`flex flex-row justify-center mb-8`}>
        <Text style={tw`text-gray-700`}>Terms of Use</Text>
        <Text style={tw`mx-3`}>|</Text>
        <Text style={tw`text-gray-700`}>Privacy Policy</Text>
      </View>
    </View>
  );
}
