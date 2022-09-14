import { Ionicons } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { firebaseAuth } from '../../firebase/utils';
import tw from '../../lib/tailwind';

export default function DropdownMenu({
  isDropdownOpen,
  setIsDropdownOpen,
}: {
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { top } = useSafeAreaInsets();

  return (
    <AnimatePresence>
      {isDropdownOpen && (
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -10 }}
          style={tw.style(
            `absolute z-50 right-4 top-16 w-auto h-auto py-2 bg-white border border-gray-300 shadow-md rounded-xl mt-[${top}px]`
          )}
        >
          <Pressable
            style={({ pressed }) =>
              tw.style('w-32 h-9 flex flex-row items-center', pressed && 'bg-gray-100')
            }
            onPress={() => setIsDropdownOpen(false)}
            accessibilityLabel="profile button"
          >
            <Ionicons name="person-outline" size={18} style={tw`w-4.5 ml-3 mr-2`} />
            <Text style={tw`text-gray-800 font-inter`}>Profile</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              tw.style('w-32 h-9 flex flex-row items-center', pressed && 'bg-gray-100')
            }
            onPress={() => setIsDropdownOpen(false)}
            accessibilityLabel="settings button"
          >
            <Ionicons name="settings-outline" size={18} style={tw`w-4.5 ml-3 mr-2`} />
            <Text style={tw`text-gray-800 font-inter`}>Settings</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              tw.style('w-32 h-9 flex flex-row items-center', pressed && 'bg-gray-100')
            }
            onPress={() => firebaseAuth().signOut()}
            accessibilityLabel="sign out button"
          >
            <Ionicons name="exit-outline" size={18} style={tw`w-4.5 ml-3 mr-2`} />
            <Text style={tw`text-gray-800 font-inter`}>Log Out</Text>
          </Pressable>
        </MotiView>
      )}
    </AnimatePresence>
  );
}
