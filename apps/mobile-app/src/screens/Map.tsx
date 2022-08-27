import MapboxGL from '@rnmapbox/maps';
import React from 'react';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import tw from '../lib/tailwind';

// MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox');
// MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Maplibre' : 'maplibre');
// MapboxGL.setWellKnownTileServer('Maplibre');
// MapboxGL.setAccessToken(
//   'sk.eyJ1IjoiY3Jhenltb25rIiwiYSI6ImNsNzZvYWthZDA3dGszd3BiMXl5dmw2YWcifQ.PoJNquv6-MpIRgqbtROPgw'
// );

export default function Map() {
  // const [region, setRegion] = useState(initialRegion);
  // const [camera] = useState<Camera>(initialCamera);
  // const mapRef = useRef<MapView | null>(null);
  // const [allBusStops, loading, error] = useDocumentData<BusStop.AllDocumentData>(
  //   firebaseStore().doc('bus-stops/all')
  // );
  // const { width: mapWidth, height: mapHeight } = useWindowDimensions();
  // const [points] = useClusterer(
  //   allBusStops?.['bus-stops'].map((busStop) => ({
  //     type: 'Feature',
  //     properties: { name: busStop.name, id: busStop.id },
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [busStop.location.longitude, busStop.location.latitude],
  //     },
  //   })) ?? [],
  //   { width: mapWidth, height: mapHeight },
  //   region,
  //   {
  //     minPoints: 5,
  //     extent: 768,
  //     radius: 18,
  //   }
  // );

  // const mapOverlayButtons: React.ReactNode[] = [
  //   <UserLocation style={tw`mt-2`} key="user-location" />,
  // ];

  // if (loading || error) {
  //   mapOverlayButtons.unshift(
  //     <Button size="sm" key="markers-loading-indicator" style={tw`mt-2`}>
  //       {loading ? (
  //         <ActivityIndicator size="small" />
  //       ) : (
  //         <Ionicons name="alert-circle-outline" size={24} />
  //       )}
  //     </Button>
  //   );
  // }

  // const renderMarker = useCallback(
  //   (
  //     point:
  //       | supercluster.PointFeature<GeoJsonProperties>
  //       | supercluster.ClusterFeatureClusterer<GeoJsonProperties>
  //   ) => {
  //     return (
  //       <Marker
  //         coordinate={{
  //           latitude: point.geometry.coordinates[1],
  //           longitude: point.geometry.coordinates[0],
  //         }}
  //         key={point.properties?.cluster_id ?? `point-${point.properties?.id}`}
  //         identifier={point.properties?.cluster_id?.toString() ?? `point-${point.properties?.id}`}
  //         pinColor="tomato"
  //         tracksViewChanges={false}
  //         // buggy on ios
  //         // image={require('../../assets/images/location.png')}
  //       />
  //     );
  //   },
  //   []
  // );

  // const handleMarkerPress = (e: PoiClickEvent | MarkerPressEvent) => {
  //   const isClusterMarker = isMarkerPressEvent(e)
  //     ? !e.nativeEvent.id?.startsWith('point-')
  //     : !e.nativeEvent.placeId?.startsWith('point-');

  //   mapRef.current?.animateToRegion(
  //     {
  //       ...e.nativeEvent.coordinate,
  //       latitudeDelta: isClusterMarker ? 0.02 : 0.005,
  //       longitudeDelta: isClusterMarker ? 0.02 : 0.005,
  //     },
  //     1000
  //   );
  // };

  // const regionChangeHandler = (region: Region) => {
  //   setRegion(region);
  // };

  // const throttledRegionChangeHandler = useMemo(() => throttle(regionChangeHandler, 250), []);

  return (
    <ViewWithSearchBar style={tw`flex flex-1`} placeholder="Search for your destination">
      {/* <MapView
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
      </View> */}

      <MapboxGL.MapView
        style={tw`absolute top-0 bottom-0 left-0 right-0`}
        styleURL={MapboxGL.StyleURL.SatelliteStreet}
      ></MapboxGL.MapView>

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
