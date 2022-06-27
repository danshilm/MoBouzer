import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import Button from '../components/Common/Button';
import TextInput from '../components/Common/TextInput';
import OnboardingFooter from '../components/OnboardingFooter';
import { firebaseAuth } from '../firebase/config';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

export default function SignIn({ navigation }: RootStackScreenProps<'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , loading] = useSignInWithEmailAndPassword(firebaseAuth);
  useDeviceContext(tw);

  const handleSignIn = () => {
    signInWithEmailAndPassword(email, password);
  };

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
            <TextInput
              label="Email address"
              as="email"
              placeholder="gandalf@tlotr.com"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              label="Password"
              as="password"
              placeholder="Thoushallnotpass123"
              value={password}
              onChangeText={setPassword}
            />
            <Button style={tw`mt-3.5`} type="primary" onPress={() => handleSignIn()}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={tw`text-base text-gray-100 font-inter-medium`}>Sign In</Text>
              )}
            </Button>
          </View>
        </View>
        <OnboardingFooter />
      </View>
    </SafeAreaView>
  );
}
