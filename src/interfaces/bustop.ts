export interface BusStop {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  photo?: {
    url?: string;
  };
}

export interface OSMNode {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: Record<string, unknown>;
}
