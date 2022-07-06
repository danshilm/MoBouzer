import React, { useState } from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BetterSearchBar from '.';
import tw from '../../lib/tailwind';
import DropdownMenu from './DropdownMenu';

export default function ViewWithSearchBar(props: ViewProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View {...props}>
      {props.children}

      <DropdownMenu isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
      <SafeAreaView style={tw`px-6 pt-4`} edges={['top']}>
        <BetterSearchBar isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
      </SafeAreaView>
    </View>
  );
}
