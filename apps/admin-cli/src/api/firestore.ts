import type { GeoPoint } from 'firebase-admin/firestore';
import { firebaseStore } from '../firebase/config';
import type { BusStopDocumentData } from '../interfaces/bus-stop';

export const updateBusStop = async (busStopId: string, location: GeoPoint, name?: string) => {
  const busStopRef = firebaseStore.doc(`bus-stops/${busStopId}`);
  const data: BusStopDocumentData = { location, id: busStopId };

  if (name) {
    data.name = name;
  }

  try {
    return await busStopRef.update(data);
  } catch (error) {
    console.log(`Could not update bus stop: ${error}`);
  }
};

// export const updateAllBusStops = async () => {};

export const getAllBusStopIds = async () => {
  try {
    const response = await firebaseStore.collection('bus-stops').listDocuments();

    return response.map((v) => v.id).filter((v) => v !== 'all');
  } catch (error) {
    console.log(`Could not get all bus stop ids: ${error}`);
  }
};
