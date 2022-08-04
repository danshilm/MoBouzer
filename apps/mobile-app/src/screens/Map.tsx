import type * as GeoJSON from 'geojson';
import { throttle } from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import type { supercluster } from 'react-native-clusterer';
import { useClusterer } from 'react-native-clusterer';
import type { MapEvent, Region } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { getBusStops } from '../api/firestore';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import regionCoordinates from '../constants/Map';
import tw from '../lib/tailwind';

export default function Map() {
  const [region, setRegion] = useState(regionCoordinates);
  const mapRef = useRef<MapView | null>(null);
  const allBusStops = getBusStops();
  const { width: mapWidth, height: mapHeight } = useWindowDimensions();
  const [points] = useClusterer(
    allBusStops.map((busStop) => ({
      type: 'Feature',
      properties: { name: busStop.tags?.name, id: busStop.id },
      geometry: { type: 'Point', coordinates: [busStop.lon, busStop.lat] },
    })),
    { width: mapWidth, height: mapHeight },
    region,
    {
      minPoints: 5,
      extent: 768,
      radius: 18,
    }
  );

  const renderItem = useCallback(
    (
      point:
        | supercluster.PointFeature<GeoJSON.GeoJsonProperties>
        | supercluster.ClusterFeatureClusterer<GeoJSON.GeoJsonProperties>
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

  const handleMarkerPress = (e: MapEvent) => {
    const isClusterMarker = !e.nativeEvent.id?.startsWith('point-');

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
        initialRegion={{
          latitude: regionCoordinates.latitude,
          longitude: regionCoordinates.longitude,
          latitudeDelta: regionCoordinates.latitudeDelta,
          longitudeDelta: regionCoordinates.longitudeDelta,
        }}
        ref={mapRef}
        onRegionChange={throttledRegionChangeHandler}
        onPoiClick={handleMarkerPress}
        onMarkerPress={handleMarkerPress}
        toolbarEnabled={false}
        showsCompass={false}
        loadingEnabled={true}
        moveOnMarkerPress={false}
      >
        {points.map(renderItem)}
      </MapView>

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
