import { credential } from 'firebase-admin';
import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = require('../../config/service-account-file.json');

const firebaseApp = initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
});

// export const firebaseStore = firestore(firebaseApp);
export const firebaseStore = getFirestore(firebaseApp);

export default firebaseApp;
