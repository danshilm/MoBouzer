import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

export default function SignIn({ navigation }: RootStackScreenProps<'SignIn'>) {
  return (
    <>
      {/* Header */}
      <View style={tw`flex flex-row items-center h-10 bg-blue-100`}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} style={tw`ml-1`} />
        </TouchableOpacity>
      </View>
    </>
  );
}
