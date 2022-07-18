import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BusLineWithStops, BusStopWithOrder } from '../interfaces/busline';
import tw from '../lib/tailwind';
import BusLineStopCard from './BusLineStopCard';

export default function BusLineSheet({ data }: { data: BusLineWithStops }) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [68, 250, 500], []);
  const maxOrder = data.busStops[data.busStops.length - 1].order;

  const renderItem = useCallback(
    (data: BusStopWithOrder) => (
      <BusLineStopCard data={data} maxOrder={maxOrder} key={data.order} />
    ),
    []
  );

  const HandleComponent = () => {
    return (
      <View style={tw`items-center w-full`}>
        <View style={tw`w-8 h-1 mt-1 bg-gray-300 rounded-md`} />
      </View>
    );
  };

  return (
    <BottomSheet snapPoints={snapPoints} ref={sheetRef} index={0} handleComponent={HandleComponent}>
      {/* Header */}
      <View style={tw`h-[15] rounded-[10px]`}>
        <View style={tw`flex-row items-center mx-2`}>
          <View style={tw`h-15 w-17 items-center justify-center`}>
            <TouchableOpacity style={tw`items-center justify-center w-8 h-8`}>
              <Ionicons name="swap-vertical-outline" size={20} style={tw``} />
            </TouchableOpacity>
          </View>
          <Text style={tw`text-lg font-inter-medium`}>Bus Line {data.id}</Text>
        </View>
      </View>
      {/* Divider */}
      <View style={tw`h-px bg-gray-600 mx-3`} />
      <BottomSheetScrollView focusHook={useFocusEffect}>
        {data.busStops.map(renderItem)}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
