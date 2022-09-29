import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../lib/tailwind';

export default function Error({ code }: { code?: number }) {
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
    <SafeAreaView style={tw`items-center justify-center flex-1 bg-white`}>
      <View style={tw`items-center`}>
        <Text style={tw`text-xl text-gray-800 font-inter-medium`}>{getErrorMessage(code)}</Text>
        <Text style={tw`mt-1 text-sm font-inter-light`}>Please close and re-open the app</Text>
        <TouchableOpacity style={tw`flex-row items-center mt-4`} activeOpacity={0.7}>
          <Text style={tw`text-xl`}>😥</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
