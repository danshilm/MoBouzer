import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBusStops } from '../api/firestore';
import BusLineSheet from '../components/BusLineSheet';
import regionCoordinates from '../constants/Map';
import { BusLineWithStops } from '../interfaces/busline';
import { NodeElement } from '../interfaces/common';
import tw from '../lib/tailwind';
import { BusLinesStackScreenProps } from '../navigation/types';

export default function BusLineDetails({
  navigation,
  route,
}: BusLinesStackScreenProps<'BusLineDetails'>) {
  const id = route.params?.id;
  const insets = useSafeAreaInsets();
  const [busStops, setBusStops] = useState<NodeElement[]>([]);
  const allBusStops = getBusStops();
  const mapRef = useRef<MapView | null>(null);

  const busLineDetails: BusLineWithStops = {
    id: id ?? 2,
    destination: {
      name: 'Curepipe',
    },
    origin: {
      name: 'Port Louis',
    },
    busStops: [
      {
        name: 'Port Louis (Victoria Square)',
        order: 1,
        isLive: true,
        label: 'Closest bus stop',
        id: 7176151924,
      },
      { name: 'Brabant (SPAR)', order: 2, id: 3768473681 },
      { name: 'G.R.N.W', order: 3, id: 3101465727 },
      { name: 'Coromandel (Sunny Hotel)', order: 4, id: 3104132163 },
      { name: 'Belle Etoile (Tamil Social Hall And another Long Thing)', order: 5, id: 7176723505 },
      { name: 'Beau Bassin (St John Store)', order: 6, id: 7081653076 },
      { name: 'Beau Bassin (Nid Horondelle)', order: 7, id: 7176723502 },
      { name: 'Rose Hill (Place Margeot)', order: 8, id: 7176712551 },
      { name: 'Belle Rose (Pepsi Cola)', order: 9, id: 7188513795 },
      { name: 'Pellegrin (United Basasalt)', order: 10, id: 7188513798 },
      { name: 'Pont Fer', order: 11, id: 4159230908 },
      { name: 'Phoenix (Police Station)', order: 12, id: 4159237944 },
      { name: 'Castel (Magasin Etoile Brillante)', order: 13, id: 7188513802 },
      { name: 'Eau Coulee (Villa Chambly)', order: 14, id: 7188513804 },
      { name: 'Curepipe (Ian Palach North)', order: 15, id: 7191794969 },
    ],
  };

  const renderBusStopMarker = useCallback(
    ({ id, lat, lon }: { id: number; lat: number; lon: number }) => {
      const name = busLineDetails.busStops.find((oneBusStop) => oneBusStop.id === id)?.name;

      return (
        <Marker coordinate={{ latitude: lat, longitude: lon }} key={id}>
          {name && (
            <Callout tooltip={false}>
              <Text>{name}</Text>
            </Callout>
          )}
        </Marker>
      );
    },
    []
  );

  useEffect(() => {
    const busLineStops: NodeElement[] = [];

    busLineDetails.busStops.forEach((oneBusStop) => {
      const existing = allBusStops.find((v) => v.id === oneBusStop.id);

      if (existing) {
        busLineStops.push({ id: existing.id, lat: existing.lat, lon: existing.lon, type: 'node' });
      }
    });

    setBusStops(busLineStops);

    mapRef?.current?.fitToCoordinates(
      busLineStops.map((busLineStop) => ({
        latitude: busLineStop.lat,
        longitude: busLineStop.lon,
      })),
      {
        animated: true,
        edgePadding: {
          top: 100,
          right: 50,
          bottom: 200,
          left: 50,
        },
      }
    );
  }, []);

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
        ref={mapRef}
        // onMapLoaded={}
      >
        {busStops.length > 1 && busStops.map(renderBusStopMarker)}
      </MapView>

      <BusLineSheet data={busLineDetails} />
    </View>
  );
}
