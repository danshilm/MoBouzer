import axios from 'axios';
import { stripIndent } from 'common-tags';
import { stringify } from 'qs';
import type { RawOSMRootObject } from '../interfaces/overpass';

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

const bbox = `(-20.745840238902247,56.888580322265625,-19.731805658115217,58.08471679687499)`;

const query = (...queries: string[]) => {
  return stripIndent`
    [out:json][timeout:25];
    (
      ${queries.map((query) => `${query}${bbox};\n`).join('')}
    );
    out body;
    >;`;
};

export const getNode = async (id: number | number[]) => {
  const queryString = Array.isArray(id) ? id.map((v) => `node(${v})`) : `node(${id})`;
  const data = Array.isArray(queryString) ? query(...queryString) : query(queryString);

  try {
    const res = await post(data);
    return res.data.elements[0];
  } catch (error) {
    console.log(`Could not retrieve node from Overpass API: ${error}`);
  }
};

export const getAllNodes = async () => {
  const data = query('node[bus=yes]', 'node[highway=bus_stop]');

  try {
    const res = await post(data);
    return res.data.elements;
  } catch (error) {
    console.log(`Could not retrieve all nodes from Overpass API: ${error}`);
  }
};
