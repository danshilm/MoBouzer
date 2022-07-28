import type * as GeoJSON from 'geojson';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import type { supercluster } from 'react-native-clusterer';
import { useClusterer } from 'react-native-clusterer';
import { Animated as MapView, Callout, MapEvent, Marker } from 'react-native-maps';
import { getBusStops } from '../api/firestore';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import regionCoordinates from '../constants/Map';
import tw from '../lib/tailwind';

export default function Map() {
  // const getDataPoint = useCallback((busStop: NodeElement) => {
  //   return {
  //     type: 'Feature',
  //     properties: { name: busStop.tags?.name, id: busStop.id },
  //     geometry: { type: 'Point', coordinates: [busStop.lon, busStop.lat] },
  //   } as
  //     | supercluster.PointFeature<GeoJSON.GeoJsonProperties>
  //     | supercluster.ClusterFeatureClusterer<GeoJSON.GeoJsonProperties>;
  // }, []);

  // const region = useMemo(() => new AnimatedRegion(regionCoordinates), []);
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
          pinColor="tomato"
          tracksViewChanges={false}
          // buggy on ios
          // image={require('../../assets/images/location.png')}
        >
          {point.properties?.cluster ? (
            // Render Cluster
            <View style={styles.clusterMarker}>
              <Text style={styles.clusterMarkerText}>{point.properties.point_count}</Text>
            </View>
          ) : (
            // Else, use default behavior to render
            // a marker and add a callout to it
            <Callout>
              <View style={styles.calloutContainer}>
                <Text>{JSON.stringify(point.properties)}</Text>
              </View>
            </Callout>
          )}
        </Marker>
      );
    },
    []
  );

  const handleMarkerPress = (e: MapEvent) => {
    mapRef.current?.animateToRegion(
      {
        ...e.nativeEvent.coordinate,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  };

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
        onRegionChangeComplete={setRegion}
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

const styles = StyleSheet.create({
  calloutContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  clusterMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8eb3ed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clusterMarkerText: {
    color: '#fff',
    fontSize: 16,
  },
});
