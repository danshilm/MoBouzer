import React, { useState } from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import useDebouncedState from '../hooks/useDebouncedState';
import tw from '../lib/tailwind';
import UserDropdown from './UserDropdown';

export default function SearchBar({
  style,
  placeholder = 'Search for your destination',
}: {
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const { value: searchValue, setValue: setSearchValue } = useDebouncedState('');

  return (
    <View
      style={[
        tw.style(
          'h-12 bg-white rounded-xl border-gray-300 shadow-md px-2 flex flex-row relative',
          focused ? 'border-2' : 'border'
        ),
        style,
      ]}
    >
      <TextInput
        style={tw`flex-1 h-full px-1 text-base font-inter ios:pb-1`}
        selectionColor={tw.color('gray-800')}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        // placeholderTextColor={tw.color('gray-300')}
        value={searchValue}
        onChangeText={(e) => setSearchValue(e)}
      />
      <View style={tw`flex items-center`}>
        <UserDropdown />
      </View>
    </View>
  );
}
