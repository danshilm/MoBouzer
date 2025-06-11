import { stripIndent } from 'common-tags';
import { stringify } from 'qs';
import type {
  NodeElement,
  RawOSMRootObject,
  RelationElement,
  WayElement,
} from '../interfaces/overpass';
import { mauritiusBBox } from '../utils/location';
import ExternalAPI from './external-api';

export default class OverpassAPI extends ExternalAPI {
  protected bbox = `(${mauritiusBBox[1].latitude},${mauritiusBBox[2].longitude},${mauritiusBBox[0].latitude},${mauritiusBBox[1].longitude})`;

  constructor() {
    super(
      'https://overpass-api.de',
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );
  }

  async useInterpreter(rawData: string): Promise<RawOSMRootObject> {
    const data = stringify({ data: rawData });
    const response = await this.axios.post<RawOSMRootObject>('/api/interpreter', data);
    return response.data;
  }

  query(...queries: string[]) {
    return stripIndent`
      [out:json][timeout:25];
      (
        ${queries.map((query) => `${query}${this.bbox};\n`).join('')}
      );
      out body;
      >;
      out body qt;`;
  }

  async getNode(id: number | number[]): Promise<NodeElement | NodeElement[]> {
    const queryString = Array.isArray(id) ? id.map((v) => `node(${v})`) : `node(${id})`;
    const data = Array.isArray(queryString) ? this.query(...queryString) : this.query(queryString);

    try {
      const res = await this.useInterpreter(data);
      return Array.isArray(id) ? (res.elements as NodeElement[]) : (res.elements[0] as NodeElement);
    } catch (error) {
      throw new Error(`Could not retrieve node ${id} from Overpass API: ${error}`);
    }
  }

  async getAllBuses(): Promise<(NodeElement | WayElement)[]> {
    const data = this.query('node[bus=yes]', 'node[highway=bus_stop]');

    try {
      const res = await this.useInterpreter(data);
      return res.elements as (NodeElement | WayElement)[];
    } catch (error) {
      throw new Error(`Could not retrieve all buses from Overpass API: ${error}`);
    }
  }

  async getBusLine(busLineId: string): Promise<(NodeElement | WayElement | RelationElement)[]> {
    const data = this.query(`relation[ref="${busLineId}"][type=route][route=bus]`);

    try {
      const res = await this.useInterpreter(data);
      return res.elements;
    } catch (error) {
      throw new Error(`Could not retrieve bus line ${busLineId} from Overpass API: ${error}`);
    }
  }
}
