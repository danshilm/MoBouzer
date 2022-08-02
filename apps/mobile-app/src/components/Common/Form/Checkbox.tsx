import Checkbox from 'expo-checkbox';
import React from 'react';
import { Text, View } from 'react-native';
import tw from '../../../lib/tailwind';

export default function FormCheckbox({
  value = false,
  onValueChange,
  errorMessage,
  children,
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
  errorMessage?: string;
  children?: React.ReactNode;
}) {
  return (
    <View>
      <View style={tw`flex flex-row items-center mt-2`}>
        <Checkbox
          style={tw`w-5 h-5 text-gray-400 border rounded-md`}
          color={
            errorMessage ? tw.color('red-700') : value ? tw.color('gray-700') : tw.color('gray-400')
          }
          value={value}
          onValueChange={onValueChange}
        />
        {children}
      </View>
      {errorMessage && (
        <Text style={tw`mt-1 text-sm text-red-700 font-inter-light`}>{errorMessage}</Text>
      )}
    </View>
  );
}