import type { CameraStop } from '@rnmapbox/maps';
// latitude = y-axis
// longitude = x-axis
// longitude, latitude
export const southWestCoordinates = [57.307921, -20.525305];
export const northEastCoordinates = [57.806426, -19.982901];
export const centreCoordinates = [57.558065, -20.241753];

export const cameraDefaultSettings: CameraStop = {
  heading: 0,
  animationDuration: 1000,
  centerCoordinate: centreCoordinates,
  zoomLevel: 8.7,
};
