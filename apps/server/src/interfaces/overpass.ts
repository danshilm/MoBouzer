// still don't know enough to be able to separate tags
// for node, way and relation elements
// afaik, they're just k-v pairs
export interface Tags {
  from?: string;
  name?: string;
  'name:en'?: string;
  'name:fr'?: string;
  'name:route'?: string;
  alt_name?: string;
  official_name?: string;
  short_name?: string;
  operator?: string;
  'public_transport:version'?: string;
  ref?: string;
  route?: string;
  to?: string;
  type?: string;
  via?: string;
  description?: string;
  highway?: string;
  lanes?: string;
  maxspeed?: string;
  oneway?: 'yes' | 'no';
  surface?: string;
  fee?: 'yes' | 'no';
  toll?: 'yes' | 'no';
  access?: 'yes' | 'no';
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

export enum ElementType {
  Node = 'node',
  Way = 'way',
  Relation = 'relation',
}

export interface NodeElement extends BaseElement {
  type: ElementType.Node;
  lat: number;
  lon: number;
  tags?: Tags;
}

export interface WayElement extends BaseElement {
  type: ElementType.Way;
  nodes: NodeElement['id'][];
}

export interface RelationElement extends BaseElement {
  type: ElementType.Relation;
  members: { type: ElementType.Way | ElementType.Node; ref: number; role?: string }[];
  tags: Tags;
}
