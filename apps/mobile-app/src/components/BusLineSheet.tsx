import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import type { BusLine } from '@mobouzer/shared';
import type { NavigationProp } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { Camera } from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import nearestPoint from '@turf/nearest-point';
import { getForegroundPermissionsAsync, getLastKnownPositionAsync } from 'expo-location';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ViewProps } from 'react-native';
import { ActivityIndicator, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import tw from '../lib/tailwind';
import type { BusLinesStackParamList } from '../navigation/types';
import Sentry from '../utils/sentry';
import BusLineStopCard from './BusLineStopCard';
import Button from './Common/Button';

interface BusLineSheetProps extends ViewProps {
  busLine?: BusLine.DocumentData;
  direction: 'forward' | 'reverse';
  loading?: boolean;
  error?: Error;
  callback: (sheetPos: number) => void;
  cameraRef: React.RefObject<Camera>;
}

export default function BusLineSheet({
  busLine,
  direction = 'forward',
  loading = true,
  error,
  callback,
  cameraRef,
}: BusLineSheetProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [68, 250, 500], []);
  const [sheetPositionIndex, setSheetPositionIndex] = useState(1);

  // used to not fit viewable area of map to markers if user pressed/focused on a bus stop
  // whenever the sheet is dragged
  // might also be good to "blur" (opposite of focusing) the bus stop whenever the
  // user moves the map like we do on the main Map screen
  const [isViewingBusStop, setIsViewingBusStop] = useState(false);
  const navigation = useNavigation<NavigationProp<BusLinesStackParamList>>();
  const [closestBusStopId, setClosestBusStopId] = useState('');

  const currentDirection = busLine?.direction[direction];
  const maxOrder = currentDirection?.['bus-stops']?.length ?? 0;
  const origin = currentDirection?.origin.name;
  const destination = currentDirection?.destination.name;

  useEffect(() => {
    const run = async () => {
      const permission = await getForegroundPermissionsAsync();
      if (!permission.granted) {
        return;
      }

      const userLocation = await getLastKnownPositionAsync();
      if (!userLocation) {
        return;
      }

      if (currentDirection?.['bus-stops']) {
        const busStopId = nearestPoint(
          point([userLocation.coords.latitude, userLocation.coords.longitude]),
          featureCollection(
            currentDirection?.['bus-stops'].map((busStop) =>
              point([busStop.location.latitude, busStop.location.longitude], { id: busStop.id })
            )
          )
        ).properties.id as string;

        setClosestBusStopId(busStopId);
      }
    };

    try {
      run();
    } catch (error) {
      Sentry.Native.captureException(error);
    }
  }, [currentDirection]);

  // todo also open bus line marker too
  const renderItem = useCallback(
    (data: BusLine.DocumentBusStopData, index: number) => (
      <BusLineStopCard
        data={data}
        maxOrder={maxOrder}
        index={index}
        key={index}
        isClosest={closestBusStopId === data.id}
        onPress={() => {
          // use temporary variable since the sheet needs to finish its animation
          // and only then will the state variable be updated
          let indexToSnapTo: number | undefined;
          // snap sheet down to middle position so that actually space to see
          // the area around the bus stop
          if (sheetPositionIndex === 2) {
            indexToSnapTo = 1;
            sheetRef.current?.snapToIndex(indexToSnapTo);
          }

          setIsViewingBusStop(true);
          cameraRef.current?.setCamera({
            zoomLevel: 15,
            centerCoordinate: [data.location.longitude, data.location.latitude],
            animationMode: 'flyTo',
            animationDuration: 1000,
            padding: {
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: (indexToSnapTo ?? sheetPositionIndex) === 1 ? 250 : 100,
            },
          });
        }}
      />
    ),
    [cameraRef, closestBusStopId, maxOrder, sheetPositionIndex]
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

      if (!isViewingBusStop) {
        // fit to markers
        callback(index);
      }
    },
    [callback, isViewingBusStop]
  );

  return (
    <>
      <View style={tw`absolute bottom-4 right-4`}>
        <Button
          size="sm"
          onPress={() => {
            setIsViewingBusStop(false);
            sheetRef.current?.snapToIndex(1);
          }}
        >
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
              accessibilityLabel="bottom sheet header"
              style={tw`h-[15] rounded-[10px]`}
              onPress={handleSheetHeaderPress}
            >
              <View style={tw`flex-row items-center mx-2`}>
                <View style={tw`items-center justify-center h-15 w-17`}>
                  <Pressable
                    accessibilityLabel="flip bus line direction"
                    style={({ pressed }) =>
                      tw.style(
                        `items-center justify-center w-10 h-10 p-1 rounded-lg`,
                        pressed && 'bg-gray-100'
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
            {error || !currentDirection?.['bus-stops']?.length ? (
              <View style={tw`items-center justify-center flex-1`}>
                <Ionicons name="alert-circle-outline" size={42} style={tw`text-slate-700`} />
              </View>
            ) : (
              <BottomSheetScrollView focusHook={useFocusEffect}>
                {currentDirection?.['bus-stops'].map(renderItem)}
              </BottomSheetScrollView>
            )}
          </View>
        )}
      </BottomSheet>
    </>
  );
}
