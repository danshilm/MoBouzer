export interface BusStop {
  id: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  photo?: {
    url?: string;
  };
}
