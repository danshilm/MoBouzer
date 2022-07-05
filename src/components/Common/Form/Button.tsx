import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from '../../../lib/tailwind';
import Button from '../Button';

export default function FormButton({
  text,
  isSubmitting,
  errorMessage,
  onPress,
}: {
  text: string;
  isSubmitting: boolean;
  errorMessage?: string;
  onPress: () => void;
}) {
  return (
    <View>
      <Button style={tw`mt-3.5`} type="primary" onPress={onPress}>
        {isSubmitting ? (
          <ActivityIndicator color={tw.color('gray-100')} />
        ) : (
          <Text style={tw`text-base text-gray-100 font-inter-medium`}>{text}</Text>
        )}
      </Button>
      {errorMessage && <Text style={tw`mt-1 text-red-700 font-inter-light`}>{errorMessage}</Text>}
    </View>
  );
}
