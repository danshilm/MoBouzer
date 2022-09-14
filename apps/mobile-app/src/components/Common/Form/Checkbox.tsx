import type { CheckboxProps as BaseCheckboxProps } from 'expo-checkbox';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { Text, View } from 'react-native';
import { gray, red } from 'tailwindcss/colors';
import tw from '../../../lib/tailwind';

interface CheckboxProps extends BaseCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  errorMessage?: string;
  children?: React.ReactNode;
}

export default function FormCheckbox({
  value = false,
  onValueChange,
  errorMessage,
  children,
  ...rest
}: CheckboxProps) {
  return (
    <View>
      <View style={tw`flex flex-row items-center mt-2`}>
        <Checkbox
          style={tw`w-5 h-5 text-gray-400 border rounded-md`}
          color={errorMessage ? red[700] : value ? gray[700] : gray[400]}
          value={value}
          onValueChange={onValueChange}
          {...rest}
        />
        {children}
      </View>
      {errorMessage && (
        <Text style={tw`mt-1 text-sm text-red-700 font-inter-light`}>{errorMessage}</Text>
      )}
    </View>
  );
}
