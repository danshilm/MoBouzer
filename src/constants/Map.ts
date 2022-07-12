// latitude = y-axis
// longitude = x-axis
// latitude, longitude
const southWestCoordinates = [-20.525305, 57.307921];
const northEastCoordinates = [-19.982901, 57.806426];
const centreCoordinates = [-20.254103, 57.5571735];

const regionCoordinates = {
  /** y-axis */
  latitude: centreCoordinates[0],
  /** x-axis */
  longitude: centreCoordinates[1],
  latitudeDelta: northEastCoordinates[0] - southWestCoordinates[0],
  longitudeDelta: (northEastCoordinates[1] - southWestCoordinates[1]) * 1.2,
};

export default regionCoordinates;
