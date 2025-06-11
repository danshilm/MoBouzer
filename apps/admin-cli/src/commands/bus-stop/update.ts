import ora from '../../utils/ora';

const updateBusStop = async (busStopId: string): Promise<void> => {
  const spinner = ora('Fetching bus stop data from Overpass').start();

  // try {
  //   // Get bus stop data from Overpass API
  //   const busStopData = await getNode(parseInt(busStopId));

  //   if (!busStopData) {
  //     spinner.fail(`No bus stop found with ID ${busStopId}`);
  //     return;
  //   }

  //   spinner.text = 'Updating bus stop in Firestore';

  //   // Create/update document in Firestore
  //   await firebaseStore.doc(`bus-stops/${busStopId}`).set(
  //     {
  //       id: busStopId,
  //       location: {
  //         latitude: busStopData.lat,
  //         longitude: busStopData.lon,
  //       },
  //       name: busStopData.tags?.name || null,
  //       osmId: busStopData.id,
  //       tags: busStopData.tags || {},
  //       updatedAt: new Date(),
  //     },
  //     { merge: true }
  //   );

  //   spinner.succeed(`Successfully updated bus stop ${busStopId}`);
  //   logger.info(`Updated bus stop ${busStopId} with name: ${busStopData.tags?.name || 'unnamed'}`);
  // } catch (error) {
  //   spinner.fail(`Failed to update bus stop ${busStopId}`);
  //   logger.error(`Error updating bus stop ${busStopId}:`, error);
  //   throw error;
  // }
};

export default updateBusStop;
