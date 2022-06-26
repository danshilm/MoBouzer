import React, { useState } from 'react';
import {
  Platform,
  Text,
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
  View
} from 'react-native';
import tw from '../../lib/tailwind';

interface TextInputProps extends BaseTextInputProps {
  label?: string;
  errorMsg?: string;
}

export default function TextInput({ label, errorMsg, ...props }: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={tw`flex flex-col justify-start w-full py-1.5`}>
      {/* label */}
      {label && (
        <Text style={tw`mb-1 text-sm text-gray-800 font-inter-light dark:text-gray-300`}>
          {label}
        </Text>
      )}
      {/* input field */}
      <BaseTextInput
        style={tw.style(
          `h-13 pb-0 pl-4 text-base dark:bg-gray-200 bg-white rounded-xl font-inter border`,
          Platform.OS === 'ios' && 'pb-1',
          errorMsg === undefined ? 'border-gray-400' : 'border-red-700',
          focused ? 'border-2' : 'border'
        )}
        selectionColor={'black'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCorrect={false}
        autoCapitalize={'none'}
        importantForAutofill="yesExcludeDescendants"
        {...props}
      />
      {errorMsg && <Text style={tw`mt-1 text-red-700 font-inter-light`}>{errorMsg}</Text>}
    </View>
  );
}
