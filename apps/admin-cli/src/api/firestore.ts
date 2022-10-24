import type { AdminBusStop } from '@mobouzer/shared';
import type { GeoPoint } from 'firebase-admin/firestore';
import { firebaseStore } from '../firebase/config';
import logger from '../utils/logger';

export const updateBusStop = async (busStopId: string, location: GeoPoint, name?: string) => {
  const busStopRef = firebaseStore.doc(`bus-stops/${busStopId}`);
  const data: AdminBusStop.DocumentData = { location, id: busStopId };

  if (name) {
    data.name = name;
  }

  try {
    return await busStopRef.update({ ...data });
  } catch (error) {
    logger.error(`Could not update bus stop: ${error}`);
  }
};

export const getAllBusStopIds = async () => {
  try {
    const response = await firebaseStore.collection('bus-stops').listDocuments();

    return response.map((v) => v.id).filter((v) => v !== 'all');
  } catch (error) {
    logger.error(`Could not get all bus stop ids: ${error}`);
  }
};

export const getAllBusLineIds = async () => {
  try {
    const response = await firebaseStore.collection('bus-lines').listDocuments();

    return response.map((v) => v.id).filter((v) => v !== 'all');
  } catch (error) {
    logger.error(`Could not get all bus line ids: ${error}`);
  }
};
