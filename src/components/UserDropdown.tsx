import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { firebaseAuth } from '../firebase/config';
import tw from '../lib/tailwind';

export default function UserDropdown() {
  const [isOpen, setisOpen] = useState(false);
  const [user] = useAuthState(firebaseAuth);

  return (
    <>
      <View style={tw`flex justify-center h-full ml-1`}>
        <TouchableOpacity
          style={tw`border border-gray-300 rounded-md w-7.5 h-7.5 flex items-center justify-center`}
          activeOpacity={0.7}
          onPress={() => setisOpen(!isOpen)}
        >
          {user?.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              defaultSource={require('../../assets/images/person.png')}
              style={tw`w-7.5 h-7.5 rounded-md`}
            />
          ) : (
            <Ionicons name="person" size={20} color={tw.color('gray-500')} />
          )}
        </TouchableOpacity>
      </View>
      {isOpen && (
        <View
          style={tw`absolute w-auto h-auto py-2 bg-white border border-gray-300 shadow-md rounded-xl -right-2 mt-13`}
        >
          <Pressable
            style={({ pressed }) =>
              tw.style('w-32 h-9 flex flex-row items-center', pressed && 'bg-gray-100')
            }
            onPress={() => setisOpen(false)}
          >
            <Ionicons name="person-outline" size={18} style={tw`w-4.5 ml-3 mr-2`} />
            <Text style={tw`text-gray-800 font-inter`}>Profile</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) =>
              tw.style('w-32 h-9 flex flex-row items-center', pressed && 'bg-gray-100')
            }
            onPress={() => setisOpen(false)}
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
    </>
  );
}
