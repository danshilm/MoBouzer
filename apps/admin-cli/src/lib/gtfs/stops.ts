import type { AdminBusStop } from '@mobouzer/shared';
import { GTFSFile } from '.';
import { firebaseStore } from '../../firebase/config';
import type { Stops } from '../../interfaces/gtfs/stops';

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
      // replace commas since that's the delimiter for the gtfs file
      stop_name: busStopData.name?.replace(',', '') ?? 'Bus Stop',
    })
  );

  return data;
};

const StopsFile = new GTFSFile('stops', getAllBusStops);

export default StopsFile;
