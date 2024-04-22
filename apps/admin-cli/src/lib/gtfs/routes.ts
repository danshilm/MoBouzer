import type { AdminBusLine } from '@mobouzer/shared';
import { GTFSFile } from '.';
import { firebaseStore } from '../../firebase/config';
import { VehicleType } from '../../interfaces/gtfs';
import type { Route } from '../../interfaces/gtfs/routes';

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

const RoutesFile = new GTFSFile('routes', getAllBusLines);

export default RoutesFile;
