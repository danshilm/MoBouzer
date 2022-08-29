import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import type { BusLine } from '@mobouzer/shared';
import type { NavigationProp } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { ViewProps } from 'react-native';
import { ActivityIndicator, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import tw from '../lib/tailwind';
import type { BusLinesStackParamList } from '../navigation/types';
import BusLineStopCard from './BusLineStopCard';
import Button from './Common/Button';

interface BusLineSheetProps extends ViewProps {
  busLine?: BusLine.DocumentData;
  direction: 'forward' | 'reverse';
  loading?: boolean;
  error?: Error;
  callback: (sheetPos: number) => void;
}

export default function BusLineSheet({
  busLine,
  direction = 'forward',
  loading = true,
  error,
  callback,
}: BusLineSheetProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [68, 250, 500], []);
  const maxOrder = busLine?.['bus-stops']?.length ?? 0;
  const origin = busLine?.direction[direction].origin.name;
  const destination = busLine?.direction[direction].destination.name;
  const [sheetPositionIndex, setSheetPositionIndex] = useState(1);
  const navigation = useNavigation<NavigationProp<BusLinesStackParamList>>();

  const renderItem = useCallback(
    (data: BusLine.DocumentBusStopData, index: number) => (
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

  const handleSheetPositionChange = useCallback(
    (index: number) => {
      setSheetPositionIndex(index);
      // fit to markers
      callback(index);
    },
    [callback]
  );

  return (
    <>
      <View style={tw`absolute bottom-4 right-4`}>
        <Button size="sm" onPress={() => sheetRef.current?.snapToIndex(1)}>
          <Ionicons name="information-circle-outline" size={24} />
        </Button>
      </View>
      <BottomSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        index={1}
        handleComponent={HandleComponent}
        onChange={handleSheetPositionChange}
        enablePanDownToClose={true}
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
                  <Pressable
                    style={({ pressed }) =>
                      tw.style(
                        `items-center justify-center w-10 h-10 p-1 rounded-lg border-gray-600 border-opacity-60`,
                        pressed && 'border'
                      )
                    }
                    onPress={() => {
                      navigation.setParams({
                        direction: direction === 'forward' ? 'reverse' : 'forward',
                      });
                    }}
                  >
                    <Ionicons name="swap-vertical-outline" size={20} />
                  </Pressable>
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
    </>
  );
}
