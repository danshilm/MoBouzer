import { Entypo, Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MotiPressable } from 'moti/interactions';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import tw from '../lib/tailwind';
import { BusLinesStackParamList, HomeTabParamList } from '../navigation/types';

interface BusLineProps {
  data: { line: string; destination: string; origin: string };
  // use the BusLinesStack navigator so we can be free of the router state when
  // going back to the grandparent navigator
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<BusLinesStackParamList, 'BusLines'>,
    BottomTabNavigationProp<HomeTabParamList, keyof HomeTabParamList>
  >;
}

export default function BusLineCard({ data, navigation }: BusLineProps) {
  return (
    <MotiPressable
      style={tw`w-full h-[50px] bg-white rounded-xl flex flex-row px-2.5 py-2.5 my-[2.5px]`}
      animate={useMemo(
        () =>
          ({ pressed }) => {
            'worklet';

            return {
              scale: pressed ? 1.05 : 1,
            };
          },
        []
      )}
      onPress={() =>
        navigation.push('BusLineDetails', { id: data.line, direction: 'forward' })
      }
    >
      <View
        style={tw`flex items-center justify-center border border-gray-300 rounded-md w-12 h-7.5`}
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
    </MotiPressable>
  );
}
