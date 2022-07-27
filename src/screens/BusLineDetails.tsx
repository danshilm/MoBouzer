import { Ionicons } from '@expo/vector-icons';
import { useDocumentDataOnce } from '@skillnation/react-native-firebase-hooks/firestore';
import React, { useCallback, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, MapEvent, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BusLineSheet from '../components/BusLineSheet';
import regionCoordinates from '../constants/Map';
import { firebaseStore } from '../firebase/utils';
import { BusLineDocumentBusStop, BusLineDocumentData } from '../interfaces/busline';
import tw from '../lib/tailwind';
import { BusLinesStackScreenProps } from '../navigation/types';

export default function BusLineDetails({
  navigation,
  route,
}: BusLinesStackScreenProps<'BusLineDetails'>) {
  const { id, direction } = route.params;
  const insets = useSafeAreaInsets();
  const [value, loading, error] = useDocumentDataOnce<BusLineDocumentData>(
    firebaseStore().doc(`bus-lines/${id}`)
  );
  const mapRef = useRef<MapView | null>(null);

  const renderBusStopMarker = useCallback((data: BusLineDocumentBusStop) => {
    return (
      <Marker
        coordinate={{ latitude: data.location.latitude, longitude: data.location.longitude }}
        key={data.id}
        tracksViewChanges={false}
      >
        {data.name && (
          <Callout tooltip={false}>
            <Text>{data.name}</Text>
          </Callout>
        )}
      </Marker>
    );
  }, []);

  const fitToMarkers = useCallback(() => {
    if (value?.direction[direction]?.['bus-stops']?.length) {
      mapRef?.current?.fitToCoordinates(
        value?.direction[direction]['bus-stops']?.map((busStop) => ({
          latitude: busStop.location.latitude,
          longitude: busStop.location.longitude,
        })),
        {
          animated: true,
          edgePadding: {
            top: 100,
            right: 50,
            bottom: 300,
            left: 50,
          },
        }
      );
    }
  }, [direction, value?.direction]);

  const handleMarkerPress = (e: MapEvent) => {
    // account for bottom sheet being open
    mapRef.current?.animateToRegion(
      {
        ...e.nativeEvent.coordinate,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  };

  useEffect(() => {
    if (value && !loading) {
      fitToMarkers();
    }
  }, [fitToMarkers, loading, value]);

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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            // doesn't work
            navigation.setParams({ direction: direction === 'forward' ? 'reverse' : 'forward' })
          }
        >
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
        onMapLoaded={fitToMarkers}
        onMarkerPress={handleMarkerPress}
        moveOnMarkerPress={false}
      >
        {value?.direction[direction]?.['bus-stops']?.length &&
          value.direction[direction]['bus-stops']?.map(renderBusStopMarker)}
      </MapView>

      {/* pass rudimentary data through here */}
      {/* and grab data from firestore in the bottom sheet component */}
      <BusLineSheet busLine={value} direction={direction} loading={loading} error={error} />
    </View>
  );
}
