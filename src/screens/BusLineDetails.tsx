import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BusLineSheet from '../components/BusLineSheet';
import regionCoordinates from '../constants/Map';
import { BusLineWithStops } from '../interfaces/busline';
import tw from '../lib/tailwind';
import { BusLinesStackScreenProps } from '../navigation/types';

export default function BusLineDetails({
  navigation,
  route,
}: BusLinesStackScreenProps<'BusLineDetails'>) {
  const id = route.params?.id;
  const insets = useSafeAreaInsets();

  const busLineDetails: BusLineWithStops = {
    id: id ?? 2,
    destination: {
      name: 'Curepipe',
    },
    origin: {
      name: 'Port Louis',
    },
    busStops: [
      { name: 'Port Louis (Victoria Square)', order: 1, isLive: true, label: 'Closest bus stop' },
      { name: 'Brabant (SPAR)', order: 2 },
      { name: 'G.R.N.W', order: 3 },
      { name: 'Coromandel (Sunny Hotel)', order: 4 },
      { name: 'Belle Etoile (Tamil Social Hall And another Long Thing)', order: 5 },
      { name: 'Beau Bassin (St John Store)', order: 6 },
      { name: 'Beau Bassin (Nid Horondelle)', order: 7 },
      { name: 'Rose Hill (Place Margeot)', order: 8 },
      { name: 'Belle Rose (Pepsi Cola)', order: 9 },
      { name: 'Pellegrin (United Basasalt)', order: 10 },
      { name: 'Pont Fer', order: 11 },
      { name: 'Phoenix (Police Station)', order: 12 },
      { name: 'Castel (Magasin Etoile Brillante)', order: 13 },
      { name: 'Eau Coulee (Villa Chambly)', order: 14 },
      { name: 'Curepipe (Ian Palach North)', order: 15 },
    ],
  };

  return (
    <View style={tw`flex-1 bg-gray-300`}>
      <View style={tw`flex flex-row items-center h-12 bg-gray-300 px-6 mt-[${insets.top + 8}px]`}>
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
        provider="google"
        initialRegion={{
          latitude: regionCoordinates.latitude - 0.15,
          longitude: regionCoordinates.longitude,
          latitudeDelta: regionCoordinates.latitudeDelta,
          longitudeDelta: regionCoordinates.longitudeDelta,
        }}
      />

      <BusLineSheet data={busLineDetails} />
    </View>
  );
}
