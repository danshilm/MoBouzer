import React from 'react';
import MapView from 'react-native-maps';
import ViewWithSearchBar from '../components/BetterSearchBar/ViewWithSearchBar';
import tw from '../lib/tailwind';

// latitude = y-axis
// longitude = x-axis
// latitude, longitude
const southWestCoordinates = [-20.525305, 57.307921];
const northEastCoordinates = [-19.982901, 57.806426];
const centreCoordinates = [-20.254103, 57.5571735];

export default function Map() {
  return (
    <ViewWithSearchBar style={tw`h-full`}>
      <MapView
        style={tw`absolute top-0 bottom-0 left-0 right-0`}
        provider="google"
        initialRegion={{
          latitude: centreCoordinates[0],
          longitude: centreCoordinates[1],
          latitudeDelta: northEastCoordinates[0] - southWestCoordinates[0],
          longitudeDelta: (northEastCoordinates[1] - southWestCoordinates[1]) * 1.2,
        }}
      ></MapView>
    </ViewWithSearchBar>
  );
}
