export interface Tags {
  from?: string;
  name?: string;
  operator?: string;
  'public_transport:version'?: string;
  ref?: string;
  route?: string;
  to?: string;
  type?: string;
  via?: string;
  description?: string;
}

export interface RawOSMRootObject {
  version: number;
  generator: string;
  osm3s: {
    timestamp_osm_base: Date;
    copyright: string;
    query?: string;
  };
  elements: (NodeElement | WayElement | RelationElement)[];
}

export interface BaseElement {
  id: number;
}

export interface NodeElement extends BaseElement {
  type: 'node';
  lat: number;
  lon: number;
  tags?: Tags;
}

export interface WayElement extends BaseElement {
  type: 'way';
  nodes: NodeElement['id'][];
}

export interface RelationElement extends BaseElement {
  type: 'relation';
  members: { type: 'way' | 'node'; ref: number; role?: string }[];
  tags: Tags;
}
