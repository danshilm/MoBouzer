import React, { useCallback, useRef } from 'react';
import { Text } from 'react-native';
import MapView, { Callout, MapEvent, Marker } from 'react-native-maps';
import { getBusStops } from '../api/firestore';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import regionCoordinates from '../constants/Map';
import { OSMNode } from '../interfaces/bustop';
import tw from '../lib/tailwind';

export default function Map() {
  const mapRef = useRef<MapView | null>(null);
  const allBusStops = getBusStops();

  const renderItem = useCallback(
    (data: OSMNode) => (
      <Marker
        coordinate={{ latitude: data.lat, longitude: data.lon }}
        key={data.id}
        pinColor="tomato"
        tracksViewChanges={false}
      >
        {!!data.tags['name'] && (
          <Callout tooltip={false}>
            <Text>{data.tags['name'] as string}</Text>
          </Callout>
        )}
      </Marker>
    ),
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
        onPoiClick={handleMarkerPress}
        onMarkerPress={handleMarkerPress}
        toolbarEnabled={false}
        showsCompass={false}
        loadingEnabled={true}
        moveOnMarkerPress={false}
      >
        {allBusStops.map(renderItem)}
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
