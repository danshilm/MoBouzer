import { Ionicons } from '@expo/vector-icons';
import type { BusLine } from '@mobouzer/shared';
import type { OnPressEvent } from '@rnmapbox/maps';
import MapboxGL, { Camera, CircleLayer, MapView, ShapeSource } from '@rnmapbox/maps';
import { useDocumentDataOnce } from '@skillnation/react-native-firebase-hooks/firestore';
import bbox from '@turf/bbox';
import type { Point } from 'geojson';
import React, { useCallback, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BusLineSheet from '../components/BusLineSheet';
import { cameraDefaultSettings } from '../constants/Map';
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
  const busStops = value?.direction[direction]['bus-stops'];
  const cameraRef = useRef<Camera>(null);

  /**
   * TODO hook up to bottom sheet
   */
  const fitToMarkers = useCallback(
    (sheetIndex = 2) => {
      if (busStops?.length) {
        const bboxCoords = bbox({
          type: 'FeatureCollection',
          features: busStops.map((busStop) => ({
            type: 'Feature',
            id: `busStop-${busStop.id}`,
            geometry: {
              type: 'Point',
              coordinates: [busStop.location.longitude, busStop.location.latitude],
            },
            properties: {},
          })),
        });

        cameraRef.current?.setCamera({
          bounds: { ne: [bboxCoords[2], bboxCoords[3]], sw: [bboxCoords[0], bboxCoords[1]] },
          padding: {
            paddingTop: 25,
            paddingBottom:
              sheetIndex === 0 || sheetIndex === 1
                ? 120
                : sheetIndex === 2
                ? 310
                : sheetIndex === 3
                ? 580
                : 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
        });
      }
    },
    [busStops]
  );

  useEffect(() => {
    if (value && !loading) {
      fitToMarkers();
    }
  }, [fitToMarkers, loading, value]);

  const handleMarkerPress = (event: OnPressEvent) => {
    const centerCoords = (event.features[0].geometry as Point).coordinates;

    cameraRef.current?.setCamera({
      zoomLevel: 15,
      centerCoordinate: [centerCoords[0], centerCoords[1]],
    });
  };

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

      <SafeAreaView style={tw`flex-1 bg-red-300`} edges={['bottom', 'left', 'right']}>
        <MapView
          style={tw`w-full h-full`}
          styleURL={MapboxGL.StyleURL.Street}
          compassEnabled={true}
          compassViewPosition={1}
          compassFadeWhenNorth={true}
          compassPosition={{ top: 0, right: 0 }}
          compassViewMargins={{ y: 10, x: 10 }}
          attributionEnabled={true}
          attributionPosition={{ bottom: 10, left: 100 }}
          logoEnabled={true}
          logoPosition={{ bottom: 10, left: 10 }}
        >
          <Camera defaultSettings={cameraDefaultSettings} ref={cameraRef} />
          {busStops && (
            <ShapeSource
              id={`bus-stops`}
              shape={{
                type: 'FeatureCollection',
                features: value.direction[direction]['bus-stops']!.map((busStop) => ({
                  type: 'Feature',
                  id: `busStop-${busStop.id}`,
                  geometry: {
                    type: 'Point',
                    coordinates: [busStop.location.longitude, busStop.location.latitude],
                  },
                  properties: {},
                })),
              }}
              cluster={false}
              onPress={handleMarkerPress}
            >
              <CircleLayer id={`layer`} style={{ circleColor: '#000', circleRadius: 5 }} />
            </ShapeSource>
          )}
        </MapView>
      </SafeAreaView>

      <BusLineSheet busLine={value} direction={direction} loading={loading} error={error} />
    </View>
  );
}
