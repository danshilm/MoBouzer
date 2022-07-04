import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { firebaseAuth } from '../firebase/config';
import tw from '../lib/tailwind';

export default function UserDropdown() {
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      <View style={tw`flex justify-center h-full ml-1`}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setisOpen(!isOpen)}>
          <Image
            source={{ uri: 'https://via.placeholder.com/600/9c184f' }}
            style={tw`border border-gray-300 rounded-md w-7.5 h-7.5`}
          />
        </TouchableOpacity>
      </View>
      {isOpen && (
        <View
          style={tw`absolute w-auto h-auto py-1 bg-white border border-gray-300 shadow-md rounded-xl -right-2 mt-13`}
        >
          <View style={tw`w-32 h-9`}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`flex flex-row items-center w-auto h-full`}
              onPress={() => setisOpen(false)}
            >
              <AntDesign name="user" size={16} style={tw`w-4 ml-3 mr-2`} />
              <Text style={tw`text-gray-800 font-inter`}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`w-32 h-9`}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`flex flex-row items-center w-auto h-full bg-gray-100`}
              onPress={() => setisOpen(false)}
            >
              <AntDesign name="setting" size={16} style={tw`w-4 ml-3 mr-2`} />
              <Text style={tw`text-gray-800 font-inter`}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`w-32 h-9`}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`flex flex-row items-center w-auto h-full`}
              onPress={() => firebaseAuth.signOut()}
            >
              <AntDesign name="logout" size={16} style={tw`w-4 ml-3 mr-2`} />
              <Text style={tw`text-gray-800 font-inter`}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
