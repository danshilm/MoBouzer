import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { gray } from 'tailwindcss/colors';
import tw from '../../../lib/tailwind';
import type { ButtonProps as BaseButtonProps } from '../Button';
import Button from '../Button';

interface ButtonProps extends BaseButtonProps {
  text: string;
  isSubmitting: boolean;
  errorMessage?: string;
  onPress: () => void;
}

export default function FormButton({
  text,
  isSubmitting,
  errorMessage,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <View>
      <Button
        style={tw`mt-3.5`}
        size="lg"
        type="primary"
        onPress={onPress}
        disabled={isSubmitting}
        {...rest}
      >
        {isSubmitting ? (
          <ActivityIndicator color={gray[100]} />
        ) : (
          <Text style={tw`text-base text-gray-100 font-inter-medium`}>{text}</Text>
        )}
      </Button>
      {errorMessage && <Text style={tw`mt-1 text-red-700 font-inter-light`}>{errorMessage}</Text>}
    </View>
  );
}
