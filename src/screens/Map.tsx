import React from 'react';
import MapView from 'react-native-maps';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import regionCoordinates from '../constants/Map';
import tw from '../lib/tailwind';

export default function Map() {
  return (
    <ViewWithSearchBar style={tw`flex flex-1`} placeholder="Search for your destination">
      <MapView
        style={tw`absolute top-0 bottom-0 left-0 right-0`}
        provider="google"
        initialRegion={{
          latitude: regionCoordinates.latitude,
          longitude: regionCoordinates.longitude,
          latitudeDelta: regionCoordinates.latitudeDelta,
          longitudeDelta: regionCoordinates.longitudeDelta,
        }}
      ></MapView>
    </ViewWithSearchBar>
  );
}
