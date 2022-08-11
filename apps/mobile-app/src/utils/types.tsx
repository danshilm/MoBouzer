import type { MarkerPressEvent, PoiClickEvent } from 'react-native-maps';

export const isMarkerPressEvent = (e: MarkerPressEvent | PoiClickEvent): e is MarkerPressEvent => {
  return (e as MarkerPressEvent).nativeEvent.id !== undefined;
};
