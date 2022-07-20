export interface BusStop {
  id: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  photo?: {
    url?: string;
  };
}

export interface BusStopWithOrder extends BusStop {
  order?: number;
  isLive?: boolean;
  label?: String;
}
