import { User } from 'firebase/auth';
import { doc, GeoPoint, getDoc, setDoc, writeBatch } from 'firebase/firestore';
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
      throw new Error('Partially batch saved bus stops, limit of 500 reached');
    }
  } catch (error) {
    console.log(`Failed to batch save bus stops: ${error}`);
  }
};

export const setBusLineStops = async (
  busLineId: string,
  busStops: NodeElement[],
  // direction 1 on schedule = forward
  direction: 'forward' | 'reverse' = 'forward'
) => {
  try {
    await setDoc(
      doc(firebaseStore, 'bus-lines', busLineId),
      {
        direction: {
          [direction]: {
            'bus-stops-ids': busStops.map((v) => doc(firebaseStore, 'bus-stops', v.id.toString())),
          },
        },
      },
      { merge: true }
    );
  } catch (error) {
    console.log(`Failed to set bus line bus stops: ${error}`);
  }
};
