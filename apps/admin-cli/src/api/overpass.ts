import axios from 'axios';
import { stripIndent } from 'common-tags';
import { stringify } from 'qs';
import type {
  NodeElement,
  RawOSMRootObject,
  RelationElement,
  WayElement,
} from '../interfaces/overpass';
import { mauritiusBBox } from '../utils/location';

const overpass = axios.create({
  baseURL: 'https://overpass-api.de',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

const post = async (rawData: string) => {
  const data = stringify({ data: rawData });
  return await overpass.post<RawOSMRootObject>('/api/interpreter', data);
};

const bbox = `(${mauritiusBBox[1].latitude},${mauritiusBBox[2].longitude},${mauritiusBBox[0].latitude},${mauritiusBBox[1].longitude})`;

const query = (...queries: string[]) => {
  return stripIndent`
    [out:json][timeout:25];
    (
      ${queries.map((query) => `${query}${bbox};\n`).join('')}
    );
    out body;
    >;
    out body qt;`;
};

export const getNode = async (id: number | number[]) => {
  const queryString = Array.isArray(id) ? id.map((v) => `node(${v})`) : `node(${id})`;
  const data = Array.isArray(queryString) ? query(...queryString) : query(queryString);

  try {
    const res = await post(data);
    return Array.isArray(id) ? res.data.elements : res.data.elements[0];
  } catch (error) {
    throw new Error(`Could not retrieve node ${id} from Overpass API: ${error}`);
  }
};

export const getAllBuses = async () => {
  const data = query('node[bus=yes]', 'node[highway=bus_stop]');

  try {
    const res = await post(data);
    return res.data.elements;
  } catch (error) {
    throw new Error(`Could not retrieve all buses from Overpass API: ${error}`);
  }
};

export const getBusLine = async (
  busLineId: string
): Promise<(NodeElement | WayElement | RelationElement)[]> => {
  const data = query(`relation[ref="${busLineId}"][type=route][route=bus]`);

  try {
    const res = await post(data);
    return res.data.elements;
  } catch (error) {
    throw new Error(`Could not retrieve bus line ${busLineId} from Overpass API: ${error}`);
  }
};
