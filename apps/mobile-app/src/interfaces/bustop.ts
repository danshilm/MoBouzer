import { DocumentData, GeoPoint } from 'firebase/firestore';

export interface BusStopDocumentData extends DocumentData {
  id: string;
  location: GeoPoint;
  name?: string;
  photo?: {
    url?: string;
  };
}
