import type { CameraStop } from '@rnmapbox/maps';
import type { Position } from 'geojson';
// latitude = y-axis
// longitude = x-axis
// longitude, latitude
export const southWestCoordinates: Position = [57.307921, -20.525305];
export const northEastCoordinates: Position = [57.806426, -19.982901];
export const centreCoordinates: Position = [57.558065, -20.241753];

export const cameraDefaultSettings: CameraStop = {
  heading: 0,
  pitch: 0,
  type: 'CameraStop',
  animationMode: 'flyTo',
  animationDuration: 2000,
  centerCoordinate: centreCoordinates,
  zoomLevel: 8.7,
};
