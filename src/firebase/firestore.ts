import { doc, setDoc } from '@firebase/firestore';
import { User } from 'firebase/auth';
import { firebaseStore } from './config';

export const initialiseUserDocument = async (user: User | null): Promise<void> => {
  if (!user) {
    return new Promise((resolve) => resolve());
  }

  try {
    await setDoc(doc(firebaseStore, 'users', user.uid), { email: user.email }, { merge: true });
    console.log(`Successfully added user document for ${user.email}`);
  } catch (reason) {
    console.log(`Failed to add user document for ${user.email}, ${JSON.stringify(reason)}`);
  }
};
