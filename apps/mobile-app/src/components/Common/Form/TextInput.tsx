import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps as BaseTextInputProps,
} from 'react-native';
import { Text, TextInput as BaseTextInput, TouchableOpacity, View } from 'react-native';
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
  ...rest
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const props: BaseTextInputProps | undefined = as && {
    textContentType: as === 'email' ? 'emailAddress' : 'password',
    autoComplete: as === 'email' ? 'email' : 'password',
    secureTextEntry: as === 'email' ? false : !isShown,
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
      <View
        style={tw.style(
          'h-13 rounded-xl border bg-white dark:bg-gray-200 flex flex-row items-center justify-center',
          errorMessage === undefined ? 'border-gray-300' : 'border-red-700',
          focused ? 'border-2' : 'border'
        )}
      >
        <BaseTextInput
          style={tw`flex-1 h-full px-4 pb-0 text-base font-inter ios:pb-1`}
          selectionColor={tw.color('gray-800')}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            // formik / react-form-hook need this
            onBlur && onBlur(e);
            setFocused(false);
          }}
          autoCorrect={false}
          autoCapitalize={'none'}
          importantForAutofill="yesExcludeDescendants"
          // placeholderTextColor={tw.color('gray-300')}
          {...props}
          {...rest}
        />
        {as === 'password' && (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsShown(!isShown)}>
            <Ionicons
              size={20}
              name={isShown ? 'md-eye-off' : 'md-eye'}
              style={tw`mr-4`}
              color={tw.color('gray-700')}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text style={tw`mt-1 text-red-700 font-inter-light`}>{errorMessage}</Text>}
    </View>
  );
}
