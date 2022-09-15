import { Ionicons } from '@expo/vector-icons';
import type { BusLine } from '@mobouzer/shared';
import type { OnPressEvent } from '@rnmapbox/maps';
import MapboxGL, { Camera, CircleLayer, LineLayer, MapView, ShapeSource } from '@rnmapbox/maps';
import { useDocumentDataOnce } from '@skillnation/react-native-firebase-hooks/firestore';
import bbox from '@turf/bbox';
import center from '@turf/center';
import { featureCollection } from '@turf/helpers';
import type { Feature, Point } from 'geojson';
import React, { useCallback, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { interpolate } from 'react-native-reanimated';
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
  const ways = value?.direction[direction].ways;
  const cameraRef = useRef<Camera>(null);
  // used to determine how to adjust the map as the bottom sheet changes position
  const mapHeight = useRef<number>(0);

  /**
   * TODO adjust camera as sheet is being dragged
   */
  const fitToMarkers = useCallback(
    (sheetIndex = 1) => {
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

        // lazy/hacky way of determining the padding of the map based on the screen dimensions
        const paddingBottom =
          sheetIndex === -1 || sheetIndex === 0
            ? interpolate(mapHeight.current, [644, 662], [120, 105])
            : sheetIndex === 1
            ? interpolate(mapHeight.current, [644, 662], [310, 280])
            : sheetIndex === 2
            ? interpolate(mapHeight.current, [644, 662], [580, 525])
            : 0;

        cameraRef.current?.setCamera({
          bounds: { ne: [bboxCoords[2], bboxCoords[3]], sw: [bboxCoords[0], bboxCoords[1]] },
          padding: {
            paddingTop: 35,
            paddingBottom,
            paddingLeft: 35,
            paddingRight: 35,
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
    const features = event.features as Feature<Point>[];
    const isClusterMarker = features.some((v) => v.properties?.cluster === true);

    cameraRef.current?.setCamera(
      isClusterMarker
        ? {
            zoomLevel: 13,
            centerCoordinate: center(featureCollection(features)).geometry.coordinates,
          }
        : { zoomLevel: 15, centerCoordinate: features[0].geometry.coordinates }
    );
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex flex-row items-center h-12 bg-gray-100 px-6 mt-[${insets.top + 8}px]`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={tw`flex flex-row items-center h-12 pr-3`}
          accessibilityLabel="back button"
        >
          <Ionicons name="arrow-back" size={20} style={tw`text-gray-800 dark:text-gray-300`} />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-gray-800 font-inter dark:text-gray-300`}>
          United Bus Service
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => console.log('Show bus line details modal')}
        >
          <Ionicons name="information-circle" size={20} />
        </TouchableOpacity>
      </View>

      <SafeAreaView
        style={tw`flex-1`}
        edges={['left', 'right']}
        onLayout={(e) => {
          mapHeight.current = e.nativeEvent.layout.height;
        }}
      >
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
          accessibilityLabel="map"
        >
          <Camera defaultSettings={cameraDefaultSettings} ref={cameraRef} />
          {busStops && (
            <ShapeSource
              id={`bus-stops`}
              shape={{
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
              }}
              cluster={true}
              clusterRadius={5}
              onPress={handleMarkerPress}
            >
              <CircleLayer id={`busStops-layer`} style={{ circleColor: '#000', circleRadius: 5 }} />
            </ShapeSource>
          )}
          {ways && (
            <ShapeSource
              id={`ways`}
              shape={{
                type: 'MultiLineString',
                coordinates: ways.map((way) =>
                  way.nodes.map((node) => [node.location.longitude, node.location.latitude])
                ),
              }}
            >
              <LineLayer
                id={`ways-layer`}
                style={{
                  lineWidth: 5,
                  lineColor: '#000',
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            </ShapeSource>
          )}
        </MapView>
      </SafeAreaView>

      <BusLineSheet
        busLine={value}
        direction={direction}
        loading={loading}
        error={error}
        callback={fitToMarkers}
      />
    </View>
  );
}
