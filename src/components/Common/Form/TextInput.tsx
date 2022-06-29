import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput as BaseTextInput,
  TextInputFocusEventData,
  TextInputProps as BaseTextInputProps,
  View
} from 'react-native';
import tw from '../../../lib/tailwind';

interface TextInputProps extends BaseTextInputProps {
  label?: string;
  errorMessage?: string;
  as?: 'email' | 'password';
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export default function FormTextInput({
  label,
  errorMessage,
  as,
  onBlur,
  ...props
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const extraInputProps: BaseTextInputProps | undefined = as && {
    textContentType: as === 'email' ? 'emailAddress' : 'password',
    autoCompleteType: as === 'email' ? 'email' : 'password',
    secureTextEntry: as === 'email' ? false : true,
  };

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
          `h-13 pb-0 px-4 text-base dark:bg-gray-200 bg-white rounded-xl font-inter border`,
          Platform.OS === 'ios' && 'pb-1',
          errorMessage === undefined ? 'border-gray-300' : 'border-red-700',
          focused ? 'border-2' : 'border'
        )}
        selectionColor={'black'}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          onBlur && onBlur(e);
          setFocused(false);
        }}
        autoCorrect={false}
        autoCapitalize={'none'}
        importantForAutofill="yesExcludeDescendants"
        {...extraInputProps}
        {...props}
      />
      {errorMessage && <Text style={tw`mt-1 text-red-700 font-inter-light`}>{errorMessage}</Text>}
    </View>
  );
}
