import type { NewRoute } from '@mobouzer/database-schema';
import { VehicleType } from '@mobouzer/shared/src/enums/routes';
import { readFile } from 'fs/promises';
import path from 'path';

const busRoutesFilePath = path.join(
  __dirname,
  '../../../../config/data/mauritius_bus_lines_cleaned.json'
);
const busRoutesFileData = readFile(busRoutesFilePath).then(
  (v) => JSON.parse(v.toString()) as NewRoute[]
);

export const busRoutesNtla = busRoutesFileData.then((rows) => {
  const busLines: Record<string, NewRoute> = {};
  rows.forEach((row) => {
    busLines[row.route_id] = {
      route_id: row.route_id,
      agency_id: row.agency_id,
      route_type: VehicleType.BUS,
      route_short_name: row.route_short_name,
      route_long_name: row.route_long_name,
      route_desc: row.route_desc,
    };
  });
  return Object.values(busLines);
});
