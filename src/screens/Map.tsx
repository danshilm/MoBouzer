import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import tw from '../lib/tailwind';

// latitude = y-axis
// longitude = x-axis
// latitude, longitude
const southWestCoordinates = [-20.525305, 57.307921];
const northEastCoordinates = [-19.982901, 57.806426];
const centreCoordinates = [-20.254103, 57.5571735];

export default function Map() {
  return (
    <View style={tw`h-full`}>
      <MapView
        style={tw`flex-1`}
        provider="google"
        initialRegion={{
          latitude: centreCoordinates[0],
          longitude: centreCoordinates[1],
          latitudeDelta: 0.7,
          longitudeDelta: 0.7,
        }}
      >
        <View style={tw`h-10 w-10 bg-red-500`}></View>
      </MapView>
    </View>
  );
}
