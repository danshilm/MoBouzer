import { firebaseAuth, firebaseStore } from '../firebase/utils';

firebaseAuth().onAuthStateChanged((user) => {
  if (!user) {
    return;
  }

  firebaseStore()
    .doc(`users/${user.uid}`)
    .update('lastActive', firebaseStore.FieldValue.serverTimestamp())
    .catch((reason) => console.log(`Failed to update user ${user.email} last active: ${reason}`));
});
