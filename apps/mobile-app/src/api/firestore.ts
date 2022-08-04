import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebaseStore } from '../firebase/utils';
import type { BusLineDocumentBusStop } from '../interfaces/busline';
import type { BusStopDocumentData } from '../interfaces/bustop';
import type { NodeElement, RawOSMRootObject } from '../interfaces/common';

export const initialiseUserDocument = async (
  user: FirebaseAuthTypes.User | null
): Promise<void> => {
  if (!user) {
    return;
  }

  try {
    await firebaseStore().doc(`users/${user.uid}`).set({ email: user.email }, { merge: true });
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
    const batch = firebaseStore().batch();
    const maxWritesExceeded = busStops.length > 500;

    busStops.slice(0, 500).forEach((busStop) => {
      const data: Partial<BusStopDocumentData> = {
        location: new firebaseStore.GeoPoint(busStop.lat, busStop.lon),
      };

      if (busStop.tags?.name) {
        data.name = busStop.tags.name;
      }

      batch.set(firebaseStore().doc(`bus-stops/${busStop.id.toString()}`), data, {
        merge: true,
      });
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
    const busStopPropPath =
      direction === 'forward' ? 'direction.forward.bus-stops' : 'direction.reverse.bus-stops';

    await firebaseStore()
      .doc(`bus-lines/${busLineId}`)
      .update({
        [busStopPropPath]: firebaseStore.FieldValue.arrayUnion(
          ...busStops.map((v) => {
            const data: BusLineDocumentBusStop = {
              id: v.id.toString(),
              location: new firebaseStore.GeoPoint(v.lat, v.lon),
              ref: firebaseStore().doc(`bus-stops/${v.id.toString()}`),
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
