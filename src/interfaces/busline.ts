import { BusStopWithOrder } from './bustop';

export interface BusLine {
  id: string;
  destination: {
    name?: string;
    id?: number;
  };
  origin: {
    name?: string;
    id?: number;
  };
}

export interface BusLineWithStops extends BusLine {
  busStops: BusStopWithOrder[];
}
