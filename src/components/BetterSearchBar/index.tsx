import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, StyleProp, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { firebaseAuth } from '../../firebase/config';
import useDebouncedState from '../../hooks/useDebouncedState';
import tw from '../../lib/tailwind';

export default function BetterSearchBar({
  style,
  placeholder = 'Search for your destination',
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
  const [user] = useAuthState(firebaseAuth);

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
        <View style={tw`flex justify-center h-full ml-1`}>
          <TouchableOpacity
            style={tw`border border-gray-300 rounded-md w-7.5 h-7.5 flex items-center justify-center`}
            activeOpacity={0.7}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                defaultSource={require('../../../assets/images/person.png')}
                style={tw`w-7.5 h-7.5 rounded-md`}
              />
            ) : (
              <Ionicons name="person" size={20} color={tw.color('gray-500')} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
