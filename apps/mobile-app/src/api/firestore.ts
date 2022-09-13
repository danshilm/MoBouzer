import { firebaseAuth, firebaseStore } from '../firebase/utils';
import Sentry from '../utils/sentry';

firebaseAuth().onAuthStateChanged((user) => {
  if (!user) {
    return;
  }

  firebaseStore()
    .doc(`users/${user.uid}`)
    .update('lastActive', firebaseStore.FieldValue.serverTimestamp())
    .catch((reason) => Sentry.Native.captureException(reason));
});
