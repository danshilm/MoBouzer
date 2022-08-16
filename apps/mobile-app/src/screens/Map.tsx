import { Ionicons } from '@expo/vector-icons';
import type { BusStop } from '@mobouzer/shared';
import { useDocumentData } from '@skillnation/react-native-firebase-hooks/firestore';
import type { GeoJsonProperties } from 'geojson';
import { throttle } from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import type { supercluster } from 'react-native-clusterer';
import { useClusterer } from 'react-native-clusterer';
import type { Camera, MarkerPressEvent, PoiClickEvent, Region } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import Compass from '../components/Map/Compass';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import { initialCamera, initialRegion } from '../constants/Map';
import { firebaseStore } from '../firebase/utils';
import tw from '../lib/tailwind';
import { isMarkerPressEvent } from '../utils/types';

export default function Map() {
  const [region, setRegion] = useState(initialRegion);
  const [camera] = useState<Camera>(initialCamera);
  const mapRef = useRef<MapView | null>(null);
  const [allBusStops, loading, error] = useDocumentData<BusStop.AllDocumentData>(
    firebaseStore().doc('bus-stops/all')
  );
  const { width: mapWidth, height: mapHeight } = useWindowDimensions();
  const [points] = useClusterer(
    allBusStops?.['bus-stops'].map((busStop) => ({
      type: 'Feature',
      properties: { name: busStop.name, id: busStop.id },
      geometry: {
        type: 'Point',
        coordinates: [busStop.location.longitude, busStop.location.latitude],
      },
    })) ?? [],
    { width: mapWidth, height: mapHeight },
    region,
    {
      minPoints: 5,
      extent: 768,
      radius: 18,
    }
  );

  const mapOverlayButtons: React.ReactNode[] = [];

  if (loading || error) {
    mapOverlayButtons.push(
      <TouchableOpacity
        activeOpacity={0.6}
        style={tw`flex items-center justify-center w-12 h-12 mt-2 bg-white shadow-sm rounded-xl`}
        key="markers-loading-indicator"
      >
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Ionicons name="alert-circle-outline" size={24} />
        )}
      </TouchableOpacity>
    );
  }

  const renderMarker = useCallback(
    (
      point:
        | supercluster.PointFeature<GeoJsonProperties>
        | supercluster.ClusterFeatureClusterer<GeoJsonProperties>
    ) => {
      return (
        <Marker
          coordinate={{
            latitude: point.geometry.coordinates[1],
            longitude: point.geometry.coordinates[0],
          }}
          key={point.properties?.cluster_id ?? `point-${point.properties?.id}`}
          identifier={point.properties?.cluster_id?.toString() ?? `point-${point.properties?.id}`}
          pinColor="tomato"
          tracksViewChanges={false}
          // buggy on ios
          // image={require('../../assets/images/location.png')}
        />
      );
    },
    []
  );

  const handleMarkerPress = (e: PoiClickEvent | MarkerPressEvent) => {
    const isClusterMarker = isMarkerPressEvent(e)
      ? !e.nativeEvent.id?.startsWith('point-')
      : !e.nativeEvent.placeId?.startsWith('point-');

    mapRef.current?.animateToRegion(
      {
        ...e.nativeEvent.coordinate,
        latitudeDelta: isClusterMarker ? 0.02 : 0.005,
        longitudeDelta: isClusterMarker ? 0.02 : 0.005,
      },
      1000
    );
  };

  const regionChangeHandler = (region: Region) => {
    setRegion(region);
  };

  const throttledRegionChangeHandler = useMemo(() => throttle(regionChangeHandler, 250), []);

  return (
    <ViewWithSearchBar style={tw`flex flex-1`} placeholder="Search for your destination">
      <MapView
        style={tw`absolute top-0 bottom-0 left-0 right-0`}
        provider="google"
        mapType="standard"
        ref={mapRef}
        camera={camera}
        onRegionChange={throttledRegionChangeHandler}
        onPoiClick={handleMarkerPress}
        onMarkerPress={handleMarkerPress}
        toolbarEnabled={false}
        showsCompass={false}
        loadingEnabled={true}
        moveOnMarkerPress={false}
      >
        {points.map(renderMarker)}
      </MapView>

      <View style={tw`flex-col items-end justify-end flex-1 mx-4 my-4`} pointerEvents="box-none">
        <Compass ref={mapRef} />
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
