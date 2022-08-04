import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface BusLineDocumentBusStop {
  id: string;
  location: FirebaseFirestoreTypes.GeoPoint;
  name?: string;
  ref: FirebaseFirestoreTypes.DocumentReference;
}

export interface BusLineDocumentDirectionData {
  'bus-stops'?: BusLineDocumentBusStop[];
  'bus-stops-ids'?: string[];
  destination: {
    id: string;
    name: string;
    ref: FirebaseFirestoreTypes.DocumentReference;
  };
  origin: {
    id: string;
    name: string;
    ref: FirebaseFirestoreTypes.DocumentReference;
  };
}

export interface BusLineDocumentData {
  id: string;
  direction: {
    forward: BusLineDocumentDirectionData;
    reverse: BusLineDocumentDirectionData;
  };
}
