import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BusLineDocumentBusStop } from '../interfaces/busline';
import tw from '../lib/tailwind';

export default function BusLineStopCard({
  data,
  maxOrder,
  index,
}: {
  data: BusLineDocumentBusStop;
  maxOrder?: number;
  index: number;
}) {
  const isFirstStop = index == 0;
  const isLastStop = index == maxOrder;
  // to determine
  const [label, _setLabel] = useState('');
  // grab from `live-buses` collection
  const [isLive, _setIsLive] = useState(false);

  return (
    <View style={tw`h-[60px] flex-1 flex-row overflow-hidden`}>
      <View style={tw`ml-2`}>
        {isFirstStop ? (
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
        )}
      </View>
      <View
        style={tw`flex-row items-center justify-between flex-1 mr-3 border-b border-b-gray-300`}
      >
        <View>
          <Text style={tw`max-w-[55] text-sm font-inter`} numberOfLines={1}>
            {data.name ?? 'Bus Stop'}
          </Text>
          {label !== '' && <Text style={tw`text-xs font-inter-light`}>{label}</Text>}
        </View>
        <View style={tw`flex-row items-center justify-end`}>
          {isLive && <View style={tw`h-[10px] w-[10px] rounded-md bg-green-600 mr-1`} />}
          <TouchableOpacity style={tw`items-center justify-center w-6 h-6 mr-3`}>
            <Ionicons name="chevron-forward-outline" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}