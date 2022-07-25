import { DocumentReference, GeoPoint } from 'firebase/firestore';

export interface BusLineDocumentBusStop {
  id: string;
  location: GeoPoint;
  name?: string;
  ref: DocumentReference;
}

export interface BusLineDocumentDirectionData {
  'bus-stops'?: BusLineDocumentBusStop[];
  'bus-stops-ids'?: string[];
  destination: {
    id: string;
    name: string;
    ref: DocumentReference;
  };
  origin: {
    id: string;
    name: string;
    ref: DocumentReference;
  };
}

export interface BusLineDocumentData {
  id: string;
  direction: {
    forward: BusLineDocumentDirectionData;
    reverse: BusLineDocumentDirectionData;
  };
}
