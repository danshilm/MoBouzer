import type { AdminBusStop } from '@mobouzer/shared';
import { FieldValue } from 'firebase-admin/firestore';
import { getAllBusStopIds } from '../../api/firestore';
import { firebaseStore } from '../../firebase/config';
import ora from '../../utils/ora';

const updateAggregateBusStop = async ({ force }: { force: boolean }): Promise<void> => {
  const spinner = ora('Initialising').start();

  const allDocRef = firebaseStore.doc(
    'bus-stops/all'
  ) as FirebaseFirestore.DocumentReference<AdminBusStop.AllDocumentData>;
  const allDocData = (await allDocRef.get()).data();

  if (!allDocData) {
    spinner.info('Aggregate document not found, creating one').start();
    await allDocRef.set({ 'bus-stops': [] });

    return updateAggregateBusStop({ force });
  }

  const allDocIds = allDocData['bus-stops'].map((v) => v.id);
  const allBusStopIds = await getAllBusStopIds();

  if (!allBusStopIds) {
    throw new Error('Could not get bus stops ids from Firestore');
  }

  if (!force && allBusStopIds.every((id) => allDocIds.includes(id))) {
    spinner.info('Nothing to update in the bus stops aggregate document');
    return;
  }

  // if force update, every bus stop must be re-added to the doc
  const missing = force
    ? allBusStopIds
    : allBusStopIds.filter((id) => !allDocData['bus-stops'].find((value) => value.id === id));

  spinner
    .info(`Bus stops to update: ${missing.length}`)
    .start('Writing bus stop documents to batch');

  try {
    for (let index = 0; index < Math.ceil(missing.length / 500); index++) {
      const batch = firebaseStore.batch();

      for await (const missingBusStopId of missing.slice(index * 500, (index + 1) * 500)) {
        const busStopSnapshot = await firebaseStore.doc(`bus-stops/${missingBusStopId}`).get();
        const busStopData = busStopSnapshot.data() as AdminBusStop.DocumentData;
        const data: Partial<AdminBusStop.AllDocumentData['bus-stops'][0]> = {
          id: missingBusStopId,
          location: busStopData.location,
        };

        if (busStopData.name) {
          data.name = busStopData.name;
        }

        spinner.text = `${missing.indexOf(missingBusStopId)}/${
          missing.length
        } Handling bus stop ${missingBusStopId}${data.name ? `, named "${data.name}"` : ''}`;

        batch.update(allDocRef, {
          'bus-stops': FieldValue.arrayUnion(data),
        });
      }

      spinner
        .info(
          `Batch committing bus stops from index ${index * 500} to ${Math.min(
            (index + 1) * 500,
            missing.length
          )}`
        )
        .start('Committing');

      await batch.commit();

      spinner.succeed(`Done!`).start('Working');
    }

    spinner.succeed(`${missing.length} bus stops updated in the aggregate document`);
  } catch (error) {
    spinner.fail(`Failed to update bus stops aggregate document: ${error}`);
  }
};

export default updateAggregateBusStop;
