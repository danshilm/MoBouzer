import React, { useState } from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '.';
import tw from '../../lib/tailwind';
import DropdownMenu from './DropdownMenu';

type ViewWithSearchBarProps = ViewProps & { placeholder?: string };

/**
 * Sigh..
 * Issue is that a component absolutely positioned outside of its parent
 * cannot register press events on Android only for some reason; the press events
 * go straight through to the one underneath
 *
 * Solution 1: have a wrapper that handles the press events, calculates whether it's
 * happening inside our problematic component, handle it from there
 *
 * Solution 2: place problematic component one step up the hiercharchy alongside the
 * other possibly absolutely positioned element
 *
 * This is solution 2.
 * @param props ViewProps + placeholder
 * @returns JSX.Element
 */
export default function ViewWithSearchBar(props: ViewWithSearchBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View {...props}>
      {/* Passing the state here because every time someone presses on an option
      the dropdown must be closed when navigating away anyway */}
      <DropdownMenu isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />

      {/* Not making the search bar absolutely positioned because it's more likely that
      components will need to be displayed only below the search bar */}
      <SafeAreaView style={tw`z-50`} edges={['top']}>
        <SearchBar
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          placeholder={props.placeholder}
        />
      </SafeAreaView>

      {props.children}
    </View>
  );
}
