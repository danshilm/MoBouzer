import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface BusStopDocumentData {
  id: string;
  location: FirebaseFirestoreTypes.GeoPoint;
  name?: string;
  photo?: {
    url?: string;
  };
}
