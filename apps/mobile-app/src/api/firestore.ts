import { User } from 'firebase/auth';
import {
  arrayUnion,
  doc,
  GeoPoint,
  getDoc,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { firebaseStore } from '../firebase/config';
import { NodeElement, RawOSMRootObject } from '../interfaces/common';

export const initialiseUserDocument = async (user: User | null): Promise<void> => {
  if (!user) {
    return;
  }

  try {
    const userData = await getDoc(doc(firebaseStore, 'users', user.uid));
    if (userData?.exists()) {
      return;
      // console.log(`Document for user ${userData.data().email} already exists`);
    }

    await setDoc(doc(firebaseStore, 'users', user.uid), { email: user.email }, { merge: true });
    // console.log(`Successfully added user document for ${user.email}`);
  } catch (reason) {
    // console.log(`Failed to add user document for ${user.email}, ${JSON.stringify(reason)}`);
  }
};

export const getBusStops = (): NodeElement[] => {
  const rawOSMData = require('../../assets/data/osm-bus-stops.json') as RawOSMRootObject;

  return rawOSMData.elements as NodeElement[];
};

export const saveBusStops = async (busStops: NodeElement[]) => {
  try {
    const batch = writeBatch(firebaseStore);
    const maxWritesExceeded = busStops.length > 500;

    busStops.slice(0, 500).forEach((busStop) => {
      const data: Record<string, unknown> = { location: new GeoPoint(busStop.lat, busStop.lon) };

      if (busStop.tags?.name) {
        data.name = busStop.tags.name;
      }

      batch.set(doc(firebaseStore, 'bus-stops', busStop.id.toString()), data, { merge: true });
    });

    await batch.commit();

    if (maxWritesExceeded) {
      throw new Error('Partial batch of bus stops saved, limit of 500 per batch reached');
    }
  } catch (error) {
    console.log(`Failed to batch save bus stops: ${error}`);
  }
};

export const setBusLineStops = async (
  busLineId: string,
  direction: 'forward' | 'reverse' = 'forward',
  busStops: NodeElement[]
) => {
  try {
    const allBusStops = require('../../assets/data/bus-lines/2.reverse.json');
    const filteredBusStops = allBusStops.members
      .filter((busStop) => busStop.type === 'node')
      .map((v) => v.ref);

    const everyOne = getBusStops();
    const myArray: NodeElement[] = [];
    filteredBusStops.forEach((element) => {
      const found = everyOne.find((v) => v.id === element);
      if (found) {
        myArray.push(found);
      }
    });

    await updateDoc(doc(firebaseStore, 'bus-lines', '2'), {
      'direction.reverse.bus-stops': arrayUnion(
        ...myArray.map((v) => {
          const data: Record<string, unknown> = {
            id: v.id,
            location: new GeoPoint(v.lat, v.lon),
            ref: doc(firebaseStore, 'bus-stops', v.id.toString()),
          };
          if (v.tags?.name) {
            data.name = v.tags.name;
          }
          return data;
        })
      ),
    });

    console.log('done');
  } catch (error) {
    console.log(`Failed to set bus line bus stops: ${error}`);
  }
};
