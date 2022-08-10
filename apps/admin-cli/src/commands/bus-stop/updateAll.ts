import type { BusStop } from '@mobouzer/shared';
import { FieldValue } from 'firebase-admin/firestore';
import ora from 'ora';
import { getAllBusStopIds } from '../../api/firestore';
import { firebaseStore } from '../../firebase/config';

export const updateAggregateBusStop = async (force = false) => {
  const spinner = ora('Initialising').start();

  const allDocSnapshot = await firebaseStore.doc('bus-stops/all').get();
  const allDocData = allDocSnapshot.data() as BusStop.AllDocumentData;
  const allDocIds = allDocData['bus-stops'].map((v) => v.id);
  const allBusStopIds = await getAllBusStopIds();

  if (!allBusStopIds) {
    spinner.fail('Could not get all bus stops ids from Firestore');
    throw new Error('Could not get bus stops ids from Firestore');
  }

  if (!force && allBusStopIds.every((id) => allDocIds.includes(id))) {
    spinner.info('Nothing to update in the bus stops aggregate document');
    // console.log('Nothing to update in all bus stops doc');
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
        const busStopData = busStopSnapshot.data() as BusStop.DocumentData;
        const data: Partial<BusStop.AllDocumentData['bus-stops'][0]> = {
          id: missingBusStopId,
          location: busStopData.location,
        };

        if (busStopData.name) {
          data.name = busStopData.name;
        }

        spinner.text = `${missing.indexOf(missingBusStopId)}/${
          missing.length
        } Handling bus stop ${missingBusStopId}${data.name ? `, named "${data.name}"` : ''}`;

        // console.log(
        //   `Batch updating bus stop ${missingBusStopId}${
        //     data.name ? ` ${data.name} ` : ''
        //   }at index ${missing.indexOf(missingBusStopId)}`
        // );

        batch.update(allDocSnapshot.ref, {
          'bus-stops': FieldValue.arrayUnion(data),
        });
      }

      // console.log(`Batch committing bus stops from index ${index * 500} to ${(index + 1) * 500}`);
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
    return missing.length;
  } catch (error) {
    spinner.fail(`Could not update bus stops aggregate document: ${error}`);
    // console.log(`Could not update all bus stops document: ${error}`);
  }
};
