import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseStore } from '../firebase/config';
import { OSMNode } from '../interfaces/bustop';

export const initialiseUserDocument = async (user: User | null): Promise<void> => {
  if (!user) {
    return;
  }

  const userData = await getDoc(doc(firebaseStore, 'users', user.uid)).catch((r) => undefined);
  if (userData?.exists()) {
    return;
    // console.log(`Document for user ${userData.data().email} already exists`);
  }

  try {
    await setDoc(doc(firebaseStore, 'users', user.uid), { email: user.email }, { merge: true });
    // console.log(`Successfully added user document for ${user.email}`);
  } catch (reason) {
    // console.log(`Failed to add user document for ${user.email}, ${JSON.stringify(reason)}`);
  }
};

interface RawOSMData {
  version: string;
  generator: string;
  osm3s: {
    // date
    timestamp_osm_base: string;
    copyright: string;
  };
  elements: OSMNode[];
}

export const getBusStops = (): OSMNode[] => {
  const rawOSMData = require('../../assets/data/osm-bus-stops.json') as RawOSMData;

  return rawOSMData.elements;
};
