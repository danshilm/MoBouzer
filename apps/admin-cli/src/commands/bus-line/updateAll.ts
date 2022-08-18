import type { AdminBusLine } from '@mobouzer/shared';
import { FieldValue } from 'firebase-admin/firestore';
import { getAllBusLineIds } from '../../api/firestore';
import { firebaseStore } from '../../firebase/config';
import ora from '../../utils/ora';

const updateAggregateBusLine = async (force = false): Promise<void> => {
  const spinner = ora('Initialising').start();

  const allDocRef = firebaseStore.doc('bus-lines/all');
  const allDocData = (await allDocRef.get()).data() as AdminBusLine.AllDocumentData | undefined;

  if (!allDocData) {
    spinner.info('Aggregate document not found, creating one').start();
    await allDocRef.set({ 'bus-lines': [] } as AdminBusLine.AllDocumentData);

    return updateAggregateBusLine(force);
  }

  const allDocIds = allDocData['bus-lines'].map((v) => v.id);
  const allBusLineIds = await getAllBusLineIds();

  if (!allBusLineIds) {
    throw new Error('Could not get bus lines ids from Firestore');
  }

  if (!force && allBusLineIds.every((id) => allDocIds.includes(id))) {
    spinner.info('Nothing to update in the bus lines aggregate document');
    return;
  }

  // if force update, every bus line must be re-added to the doc
  const missing = force
    ? allBusLineIds
    : allBusLineIds.filter((id) => !allDocIds.find((value) => value === id));

  spinner
    .info(`Bus lines to update: ${missing.length}`)
    .start('Writing bus line documents to batch');

  try {
    for (let index = 0; index < Math.ceil(missing.length / 500); index++) {
      const batch = firebaseStore.batch();

      for await (const missingBusLineId of missing.slice(index * 500, (index + 1) * 500)) {
        const busLineSnapshot = await firebaseStore.doc(`bus-lines/${missingBusLineId}`).get();
        const busLineData = busLineSnapshot.data() as AdminBusLine.DocumentData;
        const data: Partial<AdminBusLine.AllDocumentData['bus-lines'][0]> = {
          id: missingBusLineId,
          destination: busLineData.direction['forward'].destination.name,
          origin: busLineData.direction['forward'].origin.name,
        };

        spinner.text = `${missing.indexOf(missingBusLineId)}/${
          missing.length
        } Handling bus line ${missingBusLineId} ${
          busLineData.direction['forward'].origin.name
        } -> ${busLineData.direction['forward'].destination.name}`;

        batch.update(allDocRef, {
          'bus-lines': FieldValue.arrayUnion(data),
        });
      }

      spinner
        .info(
          `Batch committing bus lines from index ${index * 500} to ${Math.min(
            (index + 1) * 500,
            missing.length
          )}`
        )
        .start('Committing');

      await batch.commit();

      spinner.succeed(`Done!`).start('Working');
    }

    spinner.succeed(`${missing.length} bus lines updated in the aggregate document`);
  } catch (error) {
    spinner.fail(`Could not update bus lines aggregate document: ${error}`);
  }
};

export default updateAggregateBusLine;
