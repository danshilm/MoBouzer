import { Ionicons } from '@expo/vector-icons';
import type { BusLine } from '@mobouzer/shared';
import { useDocumentDataOnce } from '@skillnation/react-native-firebase-hooks/firestore';
import { throttle } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Camera, MarkerPressEvent, Region } from 'react-native-maps';
import MapView, { Callout, Marker } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BusLineSheet from '../components/BusLineSheet';
import Compass from '../components/Map/Compass';
import { initialCamera, initialRegion } from '../constants/Map';
import { firebaseStore } from '../firebase/utils';
import tw from '../lib/tailwind';
import type { BusLinesStackScreenProps } from '../navigation/types';

export default function BusLineDetails({
  navigation,
  route,
}: BusLinesStackScreenProps<'BusLineDetails'>) {
  const { id, direction } = route.params;
  const insets = useSafeAreaInsets();
  const [value, loading, error] = useDocumentDataOnce<BusLine.DocumentData>(
    firebaseStore().doc(`bus-lines/${id}`)
  );
  const [camera] = useState<Camera>(initialCamera);
  const mapRef = useRef<MapView | null>(null);
  const [_region, setRegion] = useState(initialRegion);

  const renderBusStopMarker = useCallback((data: BusLine.DocumentBusStopData) => {
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
            bottom: 400,
            left: 50,
          },
        }
      );
    }
  }, [direction, value?.direction]);

  const handleMarkerPress = (e: MarkerPressEvent) => {
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

  const regionChangeHandler = (region: Region) => {
    setRegion(region);
  };

  const throttledRegionChangeHandler = useMemo(() => throttle(regionChangeHandler, 250), []);

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex flex-row items-center h-12 bg-gray-100 px-6 mt-[${insets.top + 8}px]`}>
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
            // todo doesn't work
            navigation.setParams({ direction: direction === 'forward' ? 'reverse' : 'forward' })
          }
        >
          <Ionicons name="information-circle" size={20} />
        </TouchableOpacity>
      </View>

      <MapView
        style={tw`w-full h-full`}
        provider="google"
        camera={camera}
        onRegionChange={throttledRegionChangeHandler}
        ref={mapRef}
        onMapLoaded={fitToMarkers}
        onMarkerPress={handleMarkerPress}
        moveOnMarkerPress={false}
        toolbarEnabled={false}
        showsCompass={false}
      >
        {value?.direction[direction]['bus-stops']?.map(renderBusStopMarker)}
      </MapView>

      <SafeAreaView
        style={tw`absolute right-0 flex flex-col items-end justify-end mx-4 my-4 top-[${48 + 8}px]`}
        pointerEvents="box-none"
      >
        <Compass ref={mapRef} />
      </SafeAreaView>

      {/* pass rudimentary data through here */}
      {/* and grab data from firestore in the bottom sheet component */}
      <BusLineSheet busLine={value} direction={direction} loading={loading} error={error} />
    </View>
  );
}
