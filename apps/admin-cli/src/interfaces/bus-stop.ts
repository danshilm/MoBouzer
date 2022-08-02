import { DocumentData, GeoPoint } from 'firebase-admin/firestore';

export interface BusStopDocumentData extends DocumentData {
  id: string;
  location: GeoPoint;
  name?: string;
  photo?: {
    url?: string;
  };
}

export interface AllBusStopsDocumentData extends DocumentData {
  'bus-stops': {
    id: BusStopDocumentData['id'];
    location: BusStopDocumentData['location'];
    name: BusStopDocumentData['name'];
  }[];
}
