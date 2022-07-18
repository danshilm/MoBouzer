import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseStore } from '../firebase/config';
import { NodeElement, RawOSMRootObject } from '../interfaces/common';

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

export const getBusStops = (): NodeElement[] => {
  const rawOSMData = require('../../assets/data/osm-bus-stops.json') as RawOSMRootObject;

  return rawOSMData.elements as NodeElement[];
};
