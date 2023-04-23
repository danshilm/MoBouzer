import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

export const initialiseDoc = functions
  .region("asia-southeast1")
  .auth.user()
  .onCreate(async (user) => {
    functions.logger.log(`Adding user ${user.email} to firestore`, user);
    return await admin
      .firestore()
      .doc(`users/${user.uid}`)
      .set(
        {
          email: user.email,
          ui: {
            darkMode: true,
          },
          lastLoggedIn: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  });
