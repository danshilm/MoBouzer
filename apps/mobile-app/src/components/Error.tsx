import { Ionicons } from '@expo/vector-icons';
import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../lib/tailwind';
import type { RootStackParamList } from '../navigation/types';

export default function Error({ code }: { code?: number }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const getErrorMessage = (code?: number) => {
    switch (code) {
      case 404:
        return '404 - Screen Not found';
      case 500:
        return '500 - Internal Server Error';
      default:
        return 'Oops, something went wrong';
    }
  };

  return (
    <SafeAreaView style={tw`items-center justify-center flex-1 bg-slate-300`}>
      <View style={tw`items-center`}>
        <Text style={tw`text-xl font-inter-medium`}>{getErrorMessage(code)}</Text>
        <TouchableOpacity
          style={tw`flex-row items-center mt-2`}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('HomeTab', { screen: 'Map' });
          }}
        >
          <Ionicons name="enter-outline" size={25} />
          <Text style={tw`ml-3 text-base font-inter`}>Navigate Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
