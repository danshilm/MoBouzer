import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from '../../../lib/tailwind';
import Button from '../Button';

export default function FormButton({
  text,
  isSubmitting,
  error,
  onPress,
}: {
  text: string;
  isSubmitting: boolean;
  error?: boolean;
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
      {/* TODO print human readable firebase auth error */}
      {error && (
        <Text style={tw`mt-1 text-red-700 font-inter-light`}>Oops, something went wrong...</Text>
      )}
    </View>
  );
}
