import { BusStop } from './bustop';

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

export interface BusStopWithOrder extends BusStop {
  order?: number;
  isLive?: boolean;
  label?: String;
}

export interface BusLineWithStops extends BusLine {
  busStops: BusStopWithOrder[];
}
