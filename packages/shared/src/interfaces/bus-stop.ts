import type { App, GeoPoint } from './utils';

interface BaseBusStopDocumentData<T extends App> {
  id: string;
  location: GeoPoint<T>;
  name?: string;
  photo?: {
    url?: string;
  };
}

export namespace BusStop {
  type App = 'mobile-app';

  export type DocumentData = BaseBusStopDocumentData<App>;
  export interface AllDocumentData {
    'bus-stops': {
      id: DocumentData['id'];
      location: DocumentData['location'];
      name: DocumentData['name'];
    }[];
  }
}

export namespace AdminBusStop {
  type App = 'admin-cli';

  export type DocumentData = BaseBusStopDocumentData<App>;
  export interface AllDocumentData {
    'bus-stops': {
      id: DocumentData['id'];
      location: DocumentData['location'];
      name: DocumentData['name'];
    }[];
  }
}
