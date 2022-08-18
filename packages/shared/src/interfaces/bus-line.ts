import type { App, DocumentReference, GeoPoint } from './utils';

interface BaseBusLineDocumentBusStopData<T extends App> {
  id: string;
  location: GeoPoint<T>;
  name?: string;
  ref: DocumentReference<T>;
}

interface BaseBusLineDocumentDirectionData<T extends App> {
  'bus-stops'?: BaseBusLineDocumentBusStopData<T>[];
  'bus-stops-ids'?: string[];
  destination: {
    id: string;
    name: string;
    ref: DocumentReference<T>;
  };
  origin: {
    id: string;
    name: string;
    ref: DocumentReference<T>;
  };
}

interface BaseBusLineDocumentData<T extends App> {
  id: string;
  direction: {
    forward: BaseBusLineDocumentDirectionData<T>;
    reverse: BaseBusLineDocumentDirectionData<T>;
  };
}

export namespace BusLine {
  type App = 'mobile-app';

  export type DocumentData = BaseBusLineDocumentData<App>;
  export type DocumentDirectionData = BaseBusLineDocumentDirectionData<App>;
  export type DocumentBusStopData = BaseBusLineDocumentBusStopData<App>;
  export interface AllDocumentData {
    'bus-lines': {
      id: DocumentData['id'];
      destination: DocumentDirectionData['destination']['name'];
      origin: DocumentDirectionData['origin']['name'];
    }[];
  }
}

export namespace AdminBusLine {
  type App = 'admin-cli';

  export type DocumentData = BaseBusLineDocumentData<App>;
  export type DocumentDirectionData = BaseBusLineDocumentDirectionData<App>;
  export type DocumentBusStopData = BaseBusLineDocumentBusStopData<App>;
  export interface AllDocumentData {
    'bus-lines': {
      id: DocumentData['id'];
      destination: DocumentDirectionData['destination']['name'];
      origin: DocumentDirectionData['origin']['name'];
    }[];
  }
}
