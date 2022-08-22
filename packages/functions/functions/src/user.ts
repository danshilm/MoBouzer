import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const initialiseUserDoc = functions
  .region('asia-southeast1')
  .auth.user()
  .onCreate((user) => {
    if (!user.email) {
      return;
    }

    functions.logger.log(`Adding user ${user.email} to firestore`, user);
    return admin.firestore().doc(`users/${user.uid}`).set({ email: user.email }, { merge: true });
  });
