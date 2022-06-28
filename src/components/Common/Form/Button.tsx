import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import tw from '../../../lib/tailwind';
import Button from '../Button';

export default function FormButton({
  text,
  isSubmitting,
  onPress,
}: {
  text: string;
  isSubmitting: boolean;
  onPress: () => void;
}) {
  return (
    <Button style={tw`mt-3.5`} type="primary" onPress={onPress}>
      {isSubmitting ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={tw`text-base text-gray-100 font-inter-medium`}>{text}</Text>
      )}
    </Button>
  );
}
