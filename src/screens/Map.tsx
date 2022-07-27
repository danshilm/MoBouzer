import React, { useCallback, useRef, useState } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { useClusterer } from 'react-native-clusterer';
import MapView, { Callout, MapEvent, Marker } from 'react-native-maps';
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
    region
  );

  const renderItem = useCallback((point) => {
    return (
      <Marker
        coordinate={{
          latitude: point.geometry.coordinate[0],
          longitude: point.geometry.coordinate[1],
        }}
        key={point.id}
        pinColor="tomato"
        tracksViewChanges={false}
        // buggy on ios
        // image={require('../../assets/images/location.png')}
      >
        {point.properties.name && (
          <Callout tooltip={false}>
            <Text>{point.properties.name}</Text>
          </Callout>
        )}
      </Marker>
    );
  }, []);

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
        onRegionChange={setRegion}
        onPoiClick={handleMarkerPress}
        onMarkerPress={handleMarkerPress}
        toolbarEnabled={false}
        showsCompass={false}
        loadingEnabled={true}
        moveOnMarkerPress={false}
      >
        {points.map((point) => renderItem(point))}
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
