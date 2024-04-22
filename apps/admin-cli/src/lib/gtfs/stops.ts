import type { AdminBusStop } from '@mobouzer/shared';
import { GTFSFile } from '.';
import { firebaseStore } from '../../firebase/config';
import type { Stops } from '../../interfaces/gtfs/stops';

// TODO use data from database after the database has been populated with data from OSM
const getAllBusStops = async (): Promise<Stops[]> => {
  const allBusStopsRef = firebaseStore.doc(
    'bus-stops/all'
  ) as FirebaseFirestore.DocumentReference<AdminBusStop.AllDocumentData>;
  const allBusStopsData = await allBusStopsRef.get().then((v) => v.data());

  if (!allBusStopsData) {
    throw new Error('Cannot get data from aggregate bus stops document');
  }

  const data = allBusStopsData['bus-stops'].map(
    (busStopData): Stops => ({
      stop_id: busStopData.id,
      stop_lat: busStopData.location.latitude,
      stop_long: busStopData.location.longitude,
      location_type: 0,
      stop_name: busStopData.name ?? 'Bus Stop',
    })
  );

  return data;
};

class StopsGTFSFile extends GTFSFile {
  public getRecordId(record: Record<string, unknown>): string {
    return record.stop_id as string;
  }
}
const StopsFile = new StopsGTFSFile('stops', getAllBusStops);

export default StopsFile;
