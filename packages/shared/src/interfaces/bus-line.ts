import type { App, DocumentReference, GeoPoint } from './utils';

interface BaseBusLineDocumentBusStopData<T extends App> {
  id: string;
  location: GeoPoint<T>;
  name?: string;
  ref: DocumentReference<T>;
}

interface BaseBusLineDocumentWayData<T extends App> {
  id: string;
  // these need to be in order to be able to draw them
  // on a map
  nodes: {
    id: string;
    location: GeoPoint<T>;
  }[];
}

interface BaseBusLineDocumentDirectionData<T extends App> {
  'bus-stops'?: BaseBusLineDocumentBusStopData<T>[];
  ways?: BaseBusLineDocumentWayData<T>[];
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
  operator?: string;
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
  export interface AllDocumentBusStopData {
    id: DocumentData['id'];
    operator: DocumentData['operator'];
    destination: DocumentDirectionData['destination']['name'];
    origin: DocumentDirectionData['origin']['name'];
  }
  export interface AllDocumentData {
    'bus-lines': AllDocumentBusStopData[];
  }
}

export namespace AdminBusLine {
  type App = 'admin-cli';

  export type DocumentData = BaseBusLineDocumentData<App>;
  export type DocumentDirectionData = BaseBusLineDocumentDirectionData<App>;
  export type DocumentBusStopData = BaseBusLineDocumentBusStopData<App>;
  export interface AllDocumentBusStopData {
    id: DocumentData['id'];
    operator: DocumentData['operator'];
    destination: DocumentDirectionData['destination']['name'];
    origin: DocumentDirectionData['origin']['name'];
  }
  export interface AllDocumentData {
    'bus-lines': AllDocumentBusStopData[];
  }
}
