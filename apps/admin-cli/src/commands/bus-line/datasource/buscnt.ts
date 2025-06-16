import type { NewRoute } from '@mobouzer/database-schema';
import { VehicleType } from '@mobouzer/shared/src/enums/routes';
import { readFile } from 'fs/promises';
import path from 'path';

interface BusCNTInputRow {
  value: {
    routecode: string;
    routenumber: string;
    routename: string;
    numberofstages: string;
    startstage: string;
    endstage: string;
    stagenumber: string;
    from: string;
    to: string;
    ___id___: string;
  };
  options: { classes: string };
}

interface BusCNTBusLine {
  routecode: string;
  routenumber: string;
  routename: string;
  numberofstages: string;
  startstage: string;
  endstage: string;
}

const busRoutesFilePath = path.join(__dirname, '../../../../config/data/buscnt_routes.json');
const busRoutesFileData = readFile(busRoutesFilePath).then(
  (v) => JSON.parse(v.toString()) as BusCNTInputRow[]
);

export const busCNTBusLines = busRoutesFileData.then((rows) => {
  const busLines: Record<string, NewRoute> = {};
  rows.forEach((row) => {
    const { routecode, routenumber, routename, numberofstages, startstage, endstage } = row.value;
    if (!busLines[routecode]) {
      busLines[routecode] = {
        route_id: routecode,
        agency_id: 'ntc',
        route_type: VehicleType.BUS,
        route_short_name: `${routecode} ${routename}`,
        route_long_name: `${routecode} ${startstage} to ${endstage}`,
      };
    }
  });
  return Object.values(busLines);
});
