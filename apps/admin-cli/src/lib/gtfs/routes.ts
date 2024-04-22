import type { AdminBusLine } from '@mobouzer/shared';
import { GTFSFile } from '.';
import { firebaseStore } from '../../firebase/config';
import { VehicleType } from '../../interfaces/gtfs';
import type { Route } from '../../interfaces/gtfs/routes';

// TODO use data from database after the database has been populated with data from OSM
const getAllBusLines = async (): Promise<Route[]> => {
  const allBusLinesRef = firebaseStore.doc(
    `bus-lines/all`
  ) as FirebaseFirestore.DocumentReference<AdminBusLine.AllDocumentData>;
  const allBusLinesData = await allBusLinesRef.get().then((v) => v.data());

  if (!allBusLinesData) {
    throw new Error('Cannot get data from aggregate bus lines document');
  }

  const data = allBusLinesData['bus-lines'].map(
    (busLineData): Route => ({
      route_id: busLineData.id,
      route_type: VehicleType.BUS,
      agency_id: busLineData.operator,
      route_long_name: `${busLineData.origin} to ${busLineData.destination}`,
      // route URL needs the relation ID from OSM
      // route_url: `https://www.openstreetmap.org/relation/${busLineData.id}`,
    })
  );

  return data;
};

class RoutesGTFSFile extends GTFSFile {
  public getRecordId(record: Record<string, unknown>): string {
    return record.route_id as string;
  }
}
const RoutesFile = new RoutesGTFSFile('routes', getAllBusLines);

export default RoutesFile;
