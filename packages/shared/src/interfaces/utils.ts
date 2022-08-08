import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import type {
  DocumentReference as AdminDocumentReference,
  GeoPoint as AdminGeoPoint,
} from 'firebase-admin/firestore';

export type App = 'admin-cli' | 'mobile-app';

type AppChooser<X extends App, T, U> = X extends 'admin-cli' ? T : U;

export type DocumentReference<X extends App> = AppChooser<
  X,
  AdminDocumentReference,
  FirebaseFirestoreTypes.DocumentReference
>;

export type GeoPoint<X extends App> = AppChooser<X, AdminGeoPoint, FirebaseFirestoreTypes.GeoPoint>;
