import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { firebaseAuth } from '../../firebase/config';
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
    <View>
      {isDropdownOpen && (
        <View
          style={tw.style(
            `absolute z-10 right-6 top-17 w-auto h-auto py-2 bg-white border border-gray-300 shadow-md mt-17 rounded-xl mt-[${top}px]`
          )}
        >
          <Pressable
            style={({ pressed }) =>
              tw.style('w-32 h-9 flex flex-row items-center', pressed && 'bg-gray-100')
            }
            onPress={() => setIsDropdownOpen(false)}
          >
            <Ionicons name="person-outline" size={18} style={tw`w-4.5 ml-3 mr-2`} />
            <Text style={tw`text-gray-800 font-inter`}>Profile</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              tw.style('w-32 h-9 flex flex-row items-center', pressed && 'bg-gray-100')
            }
            onPress={() => setIsDropdownOpen(false)}
          >
            <Ionicons name="settings-outline" size={18} style={tw`w-4.5 ml-3 mr-2`} />
            <Text style={tw`text-gray-800 font-inter`}>Settings</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              tw.style('w-32 h-9 flex flex-row items-center', pressed && 'bg-gray-100')
            }
            onPress={() => firebaseAuth.signOut()}
          >
            <Ionicons name="exit-outline" size={18} style={tw`w-4.5 ml-3 mr-2`} />
            <Text style={tw`text-gray-800 font-inter`}>Log Out</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
