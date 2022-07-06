import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, TouchableOpacity, View } from 'react-native';
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
    </>
  );
}
