import { GeoPoint } from 'firebase-admin/firestore';

/**
 * 1st -> top right,
 * 2nd -> bottom right,
 * 3rd -> bottom left,
 * 4th -> top left
 */
export const mauritiusBBox = [
  new GeoPoint(-19.885925, 57.925834),
  new GeoPoint(-20.582286, 57.925834),
  new GeoPoint(-20.582286, 57.224251),
  new GeoPoint(-19.885925, 57.224251),
];
