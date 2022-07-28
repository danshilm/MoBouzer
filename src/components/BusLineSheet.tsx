import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { BusLineDocumentBusStop, BusLineDocumentData } from '../interfaces/busline';
import tw from '../lib/tailwind';
import BusLineStopCard from './BusLineStopCard';

export default function BusLineSheet({
  busLine,
  direction = 'forward',
  loading = true,
  error,
}: {
  busLine?: BusLineDocumentData;
  direction: 'forward' | 'reverse';
  loading?: boolean;
  error?: Error;
}) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [68, 250, 500], []);
  const maxOrder = busLine?.['bus-stops']?.length ?? 0;
  const origin = busLine?.direction[direction].origin.name;
  const destination = busLine?.direction[direction].destination.name;
  const [sheetPositionIndex, setSheetPositionIndex] = useState(0);

  const renderItem = useCallback(
    (data: BusLineDocumentBusStop, index: number) => (
      <BusLineStopCard data={data} maxOrder={maxOrder} index={index} key={index} />
    ),
    [maxOrder]
  );

  const HandleComponent = () => {
    return (
      <View style={tw`items-center w-full`}>
        <View style={tw`w-8 h-1 mt-1 bg-gray-300 rounded-md`} />
      </View>
    );
  };

  const handleSheetHeaderPress = () => {
    // expand sheet if minimised
    if (sheetPositionIndex === 0 || sheetPositionIndex === 1) {
      sheetRef.current?.snapToIndex(2);
    } else {
      sheetRef.current?.snapToIndex(0);
    }
  };

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={sheetRef}
      index={1}
      handleComponent={HandleComponent}
      onChange={setSheetPositionIndex}
    >
      {loading ? (
        <ActivityIndicator size="large" style={tw`h-1/3`} />
      ) : !busLine ? (
        <View style={tw`items-center justify-center h-1/3`}>
          <Ionicons name="alert-circle-outline" size={42} style={tw`text-slate-700`} />
        </View>
      ) : (
        <View style={tw`flex-1`}>
          {/* Header */}
          <TouchableWithoutFeedback
            style={tw`h-[15] rounded-[10px]`}
            onPress={handleSheetHeaderPress}
          >
            <View style={tw`flex-row items-center mx-2`}>
              <View style={tw`items-center justify-center h-15 w-17`}>
                <TouchableOpacity style={tw`items-center justify-center w-8 h-8`}>
                  <Ionicons name="swap-vertical-outline" size={20} />
                </TouchableOpacity>
              </View>
              {loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={tw`text-lg font-inter-medium`}>
                  {busLine.id} {origin}
                  {' -> '}
                  {destination}
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          {/* Divider */}
          <View style={tw`h-px mx-3 bg-gray-600`} />
          {error || !busLine.direction[direction]['bus-stops']?.length ? (
            <View style={tw`items-center justify-center flex-1`}>
              <Ionicons name="alert-circle-outline" size={42} style={tw`text-slate-700`} />
            </View>
          ) : (
            <BottomSheetScrollView focusHook={useFocusEffect}>
              {busLine.direction[direction]['bus-stops']?.map(renderItem)}
            </BottomSheetScrollView>
          )}
        </View>
      )}
    </BottomSheet>
  );
}
