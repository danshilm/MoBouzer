import { Ionicons } from '@expo/vector-icons';
import type { BusLine } from '@mobouzer/shared';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../lib/tailwind';

export default function BusLineStopCard({
  data,
  maxOrder,
  index,
  isClosest,
}: {
  data: BusLine.DocumentBusStopData;
  maxOrder: number;
  index: number;
  isClosest: boolean;
}) {
  const isFirstStop = index === 0;
  const isLastStop = index === maxOrder - 1;
  // grab from `live-buses` collection
  const [isLive, _setIsLive] = useState(false);

  const busStopPath = isFirstStop ? (
    <View style={tw`items-center h-full pt-6 w-17`}>
      <View style={tw`w-3 h-3 bg-gray-700 rounded-md`} />
      <View style={tw`flex-1 w-px bg-gray-700`} />
    </View>
  ) : !isLastStop ? (
    <View style={tw`items-center h-full w-17`}>
      <View style={tw`w-px bg-gray-700 h-7 `} />
      <View style={tw`w-2 h-2 bg-gray-700 rounded-md`} />
      <View style={tw`w-px bg-gray-700 h-7 `} />
    </View>
  ) : (
    <View style={tw`items-center h-full pb-6 w-17`}>
      <View style={tw`flex-1 w-px bg-gray-700`} />
      <View style={tw`w-3 h-3 bg-gray-700 rounded-md`} />
    </View>
  );

  return (
    <View
      style={tw`h-[60px] flex-1 flex-row`}
      accessibilityLabel={`${data.name ?? 'unnamed'} bus stop card`}
    >
      <View style={tw`ml-2`}>{busStopPath}</View>
      <View
        style={tw.style(
          `flex-row items-center justify-between flex-1 mr-3 border-b-gray-300`,
          !isLastStop && 'border-b'
        )}
      >
        <TouchableOpacity style={tw`flex-row`} activeOpacity={0.6}>
          <View>
            <Text style={tw`max-w-[55] text-sm font-inter`} numberOfLines={1}>
              {data.name ?? 'Bus Stop'}
            </Text>
            {isClosest && <Text style={tw`text-xs font-inter-light`}>Closest Bus Stop</Text>}
          </View>
          <View style={tw`flex-row items-center justify-end flex-1`}>
            {isLive && <View style={tw`h-[10px] w-[10px] rounded-md bg-green-600 mr-1`} />}
            <Ionicons name="chevron-forward-outline" size={18} style={tw`mr-3`} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
