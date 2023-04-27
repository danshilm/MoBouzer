import { Ionicons } from '@expo/vector-icons';
import MapLibreGL from '@maplibre/maplibre-react-native';
import type { BusStop } from '@mobouzer/shared';
import type { Feature, Point } from '@turf/helpers';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../../lib/tailwind';

export default function BusStopMarker({
  point,
  busStop,
}: {
  point: Feature<Point>;
  busStop: BusStop.DocumentData | undefined;
}) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <MapLibreGL.MarkerView
      id={`busStop-${busStop?.id}`}
      coordinate={point.geometry.coordinates as [number, number]}
      anchor={{ y: 1.8, x: 0.5 }}
    >
      <TouchableOpacity
        style={tw`self-center h-10 p-2 bg-white rounded-md shadow-md`}
        activeOpacity={0.7}
      >
        <View style={tw`flex-row items-center self-center justify-between flex-1`}>
          {busStop && busStop.name ? (
            <Text style={tw`text-sm font-inter`}>{busStop.name}</Text>
          ) : (
            <Text style={tw`text-sm italic text-gray-500 font-inter`}>Bus Stop</Text>
          )}
          <Ionicons
            name="arrow-forward"
            size={14}
            style={tw`px-1 text-gray-800 dark:text-gray-300`}
          />
        </View>
      </TouchableOpacity>
    </MapLibreGL.MarkerView>
  );
}
