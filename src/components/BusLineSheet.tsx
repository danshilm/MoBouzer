import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { BusLineWithStops } from '../interfaces/busline';
import tw from '../lib/tailwind';
import BottomSheet from './BottomSheet';
import BusLineStopCard from './BusLineStopCard';

export default function BusLineSheet({ data }: { data: BusLineWithStops }) {
  return (
    <BottomSheet minSheetHeight={36 + 36} maxSheetHeight={256}>
      {/* Header */}
      <Animated.View style={tw`h-[18] rounded-[10px]`}>
        {/* Pill */}
        <View style={tw`items-center w-full`}>
          <View style={tw`w-8 h-1 mt-1 bg-gray-300 rounded-md`} />
        </View>
        <View style={tw`flex-row items-center mx-2`}>
          <View style={tw`h-15 w-17 items-center justify-center`}>
            <TouchableOpacity style={tw`items-center justify-center w-8 h-8`}>
              <Ionicons name="swap-vertical-outline" size={20} style={tw``} />
            </TouchableOpacity>
          </View>
          <Text style={tw`text-lg font-inter-medium`}>Bus Line {data.id}</Text>
        </View>
      </Animated.View>
      {/* Divider */}
      <View style={tw`h-px bg-gray-600 mx-3`} />
      {/* TODO fix unable to scroll on Android */}
      {/* TODO fix scrollview snapping back to top on iOS */}
      <ScrollView
        scrollEventThrottle={16}
        style={tw`flex-1`}
        // onScroll={() => console.log('scrolling')}
      >
        {data.busStops.map((busStop) => (
          <BusLineStopCard
            data={busStop}
            maxOrder={data.busStops[data.busStops.length - 1].order}
            key={busStop.order}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}
