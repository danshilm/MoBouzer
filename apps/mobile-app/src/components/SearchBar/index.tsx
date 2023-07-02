import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { gray } from 'tailwindcss/colors';
import useDebouncedState from '../../hooks/useDebouncedState';
import tw from '../../lib/tailwind';

export default function SearchBar({
  style,
  placeholder = 'Search',
  isDropdownOpen = false,
  setIsDropdownOpen,
}: {
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  isDropdownOpen?: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [focused, setFocused] = useState(false);
  const { value: searchValue, setValue: setSearchValue } = useDebouncedState('');
  /** TODO Use gravatar? */
  const [photoURL] = useState('');

  return (
    <View
      style={[
        tw.style(
          'flex flex-row h-12 px-2 bg-white border-gray-300 shadow-md rounded-xl mt-2 mx-4',
          focused ? 'border-2' : 'border'
        ),
        style,
      ]}
    >
      <TextInput
        style={tw`flex-1 h-full px-2 text-base font-inter ios:pb-1`}
        selectionColor={gray[800]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={gray[300]}
        value={searchValue}
        onChangeText={(e) => setSearchValue(e)}
        accessibilityLabel="search input"
      />
      <View style={tw`flex items-center`}>
        <View style={tw`flex justify-center h-full ml-1`}>
          <TouchableOpacity
            style={tw`border border-gray-300 rounded-md w-7.5 h-7.5 flex items-center justify-center`}
            activeOpacity={0.7}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {photoURL ? (
              <Image
                source={{ uri: photoURL }}
                loadingIndicatorSource={require('../../../assets/images/person.png')}
                style={tw`w-7.5 h-7.5 rounded-md`}
                accessibilityLabel="profile picture"
              />
            ) : (
              <Ionicons name="person" size={20} color={gray[500]} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
