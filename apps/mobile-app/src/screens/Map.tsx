import { Ionicons } from '@expo/vector-icons';
import type { BusStop } from '@mobouzer/shared';
import type { OnPressEvent } from '@rnmapbox/maps';
import MapboxGL, { Camera, CircleLayer, MapView, ShapeSource } from '@rnmapbox/maps';
import { useDocumentData } from '@skillnation/react-native-firebase-hooks/firestore';
import center from '@turf/center';
import { featureCollection } from '@turf/helpers';
import Constants from 'expo-constants';
import { getCurrentPositionAsync } from 'expo-location';
import type { Feature, Point } from 'geojson';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import Button from '../components/Common/Button';
import UserLocationButton from '../components/Map/UserLocationButton';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import { cameraDefaultSettings } from '../constants/Map';
import { firebaseStore } from '../firebase/utils';
import useSecondBottomTabPress from '../hooks/useSecondBottomTabPress';
import tw from '../lib/tailwind';
import { sleep } from '../utils/common';

MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox');
MapboxGL.setAccessToken(Constants.expoConfig?.extra?.mapboxToken);

const cameraDefaultSettingsWithPadding = {
  ...cameraDefaultSettings,
  padding: { paddingTop: 60, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 },
};

export default function Map() {
  const cameraRef = useRef<Camera | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [followUser, setFollowUser] = useState(false);
  const [allBusStops, loading, error] = useDocumentData<BusStop.AllDocumentData>(
    firebaseStore().doc('bus-stops/all')
  );

  const resetCameraSettings = async () => {
    setFollowUser(false);
    // have to wait for a bit else the setCamera calls happens when
    // followUserLocation is still true, and it doesn't do anything
    await sleep(100);
    cameraRef.current?.setCamera(cameraDefaultSettingsWithPadding);
  };

  useSecondBottomTabPress('Map', resetCameraSettings);

  const mapOverlayButtons: React.ReactNode[] = [
    <UserLocationButton
      style={tw`mt-2`}
      key="user-location"
      isFollowingUser={followUser}
      callback={{
        whenNotFollowingUser: async () => {
          // workaround for setCamera not being called if Camera's followUserLocation is true
          // https://github.com/rnmapbox/maps/issues/1079
          const currentPosition = await getCurrentPositionAsync();
          cameraRef.current?.setCamera({
            pitch: 50,
            zoomLevel: 16,
            animationDuration: 2000,
            animationMode: 'flyTo',
            centerCoordinate: [currentPosition.coords.longitude, currentPosition.coords.latitude],
          });
          await sleep(2000);
          setFollowUser(true);
        },
        whenFollowingUser: async () => {
          setFollowUser(false);
          // have to wait for a bit else the setCamera calls happens when
          // followUserLocation is still true, and it doesn't do anything
          await sleep(100);
          cameraRef.current?.setCamera({
            pitch: 0,
            zoomLevel: 14,
            animationDuration: 1500,
            animationMode: 'flyTo',
          });
        },
      }}
    />,
  ];

  if (loading || error) {
    mapOverlayButtons.unshift(
      <Button size="sm" key="markers-loading-indicator" style={tw`mt-2`}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Ionicons name="alert-circle-outline" size={24} />
        )}
      </Button>
    );
  }

  const handleMarkerPress = (e: OnPressEvent) => {
    const features = e.features as Feature<Point>[];
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
    <ViewWithSearchBar style={tw`flex flex-1`} placeholder="Search for your destination">
      <MapView
        ref={mapRef}
        style={tw`absolute top-0 bottom-0 left-0 right-0`}
        styleURL={MapboxGL.StyleURL.Street}
        compassEnabled={true}
        compassViewPosition={1}
        compassFadeWhenNorth={true}
        compassPosition={{ top: 0, right: 0 }}
        // todo put correct location for compass; take into account screen size
        compassViewMargins={{ y: 100, x: 16 }}
        attributionEnabled={true}
        attributionPosition={{ bottom: 10, left: 100 }}
        logoEnabled={true}
        logoPosition={{ bottom: 10, left: 10 }}
        accessibilityLabel="map"
        // stop following whenever the user moves the map
        onRegionIsChanging={(e) =>
          e.properties.isUserInteraction && followUser === true && setFollowUser(false)
        }
      >
        <Camera
          defaultSettings={{ ...cameraDefaultSettingsWithPadding }}
          ref={cameraRef}
          followUserLocation={followUser}
          followZoomLevel={16}
          followPitch={50}
          followUserMode="compass"
        />
        <MapboxGL.UserLocation
          showsUserHeadingIndicator={true}
          animated={true}
          renderMode="native"
          androidRenderMode="compass"
          // todo find a way to set this to true when the user grants location permission
          visible={true}
        />
        {allBusStops && (
          <ShapeSource
            id={`bus-stops`}
            shape={{
              type: 'FeatureCollection',
              features: allBusStops['bus-stops'].map((busStop) => ({
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
            <CircleLayer id={`layer`} style={{ circleColor: '#000', circleRadius: 5 }} />
          </ShapeSource>
        )}
      </MapView>

      <View style={tw`flex-col items-end justify-end flex-1 px-4 py-4`} pointerEvents="box-none">
        <View style={tw`flex-1`} />
        {mapOverlayButtons}
      </View>

      {/* use this as reference to put a compass and trigger follow user location */}
      {/* <SafeAreaView style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <View style={tw`flex-1`}>
          <SearchBar panY={y} />
          <NavBar panY={y} />
        </View>
      </SafeAreaView> */}
    </ViewWithSearchBar>
  );
}
