import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import tw from '../lib/tailwind';

interface BusLineProps {
  data: { line: number; destination: string; origin: string };
}

export default function BusLineCard({ data }: BusLineProps) {
  return (
    <View style={tw`w-full h-[50px] bg-white rounded-xl flex flex-row px-2.5 py-2.5 my-[2.5px]`}>
      <View
        style={tw`flex items-center justify-center border border-gray-300 rounded-md w-7 h-7.5`}
      >
        <Text style={tw`text-base text-gray-800 font-inter`}>{data.line}</Text>
      </View>
      <View style={tw`ml-2.5 h-full flex justify-center flex-1`}>
        <Text style={tw`text-sm text-gray-800 font-inter`}>
          {data.origin} - {data.destination}
        </Text>
      </View>
      <View style={tw`flex flex-row items-center justify-end`}>
        <Ionicons name="information-circle" size={18} />
        <Entypo name="chevron-right" size={18} />
      </View>
    </View>
  );
}
