import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../components/BottomSheet';
import regionCoordinates from '../constants/Map';
import tw from '../lib/tailwind';
import { BusLinesStackScreenProps } from '../navigation/types';
import { navigationRef } from '../navigation/utils';

export default function BusLineDetails({ navigation }: BusLinesStackScreenProps<'BusLineDetails'>) {
  const { id } = (navigationRef.current?.getCurrentRoute()?.params as
    | { id: string }
    | undefined) ?? {
    id: undefined,
  };

  const insets = useSafeAreaInsets();
  const y = useSharedValue(0);

  return (
    <View style={tw`flex-1 bg-gray-300`}>
      <View style={tw`flex flex-row items-center h-12 bg-gray-300 px-6 mt-[${insets.top + 8}]`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={tw`flex flex-row items-center h-12 pr-3`}
        >
          <Ionicons name="arrow-back" size={20} style={tw`text-gray-800 dark:text-gray-300`} />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-gray-800 font-inter dark:text-gray-300`}>
          United Bus Service
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="information-circle" size={20} />
        </TouchableOpacity>
      </View>

      <MapView
        style={tw`w-full h-full`}
        initialRegion={{
          latitude: regionCoordinates.latitude - 0.15,
          longitude: regionCoordinates.longitude,
          latitudeDelta: regionCoordinates.latitudeDelta,
          longitudeDelta: regionCoordinates.longitudeDelta,
        }}
        provider="google"
      />

      {/* <GeoBar panY={y} />

      <Overlay panY={y} />

      <PicturesCarousel panY={y} /> */}

      <BottomSheet panY={y}>
        <Text style={tw`text-xl font-inter-medium`}>Bus Line: {id}</Text>
      </BottomSheet>

      {/* <SafeAreaView style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={tw`flex-1`}>
          <SearchBar panY={y} />
          <NavBar panY={y} />
        </View>
      </SafeAreaView> */}
    </View>
  );
}
