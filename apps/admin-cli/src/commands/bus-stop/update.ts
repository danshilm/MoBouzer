import { stop } from '@mobouzer/database-schema';
import { LocationType } from '@mobouzer/shared';
import { getNode } from '../../api/overpass';
import { db } from '../../db';
import type { NodeElement } from '../../interfaces/overpass';
import logger from '../../utils/logger';
import ora from '../../utils/ora';

const updateBusStop = async (busStopId: string): Promise<unknown> => {
  const spinner = ora('Fetching bus stop data from Overpass').start();

  try {
    // Get bus stop data from Overpass API
    const busStopData = (await getNode(parseInt(busStopId))) as NodeElement;

    if (!busStopData) {
      return spinner.fail(`No bus stop found with ID ${busStopId}`);
    }

    spinner.text = 'Updating bus stop in database';

    // Create/update document in Firestore
    await db.insert(stop).values({
      stop_id: busStopData.id.toString(),
      stop_lat: busStopData.lat,
      stop_long: busStopData.lon,
      stop_name: busStopData.tags?.name || 'Unnamed Stop',
      location_type:
        busStopData.tags?.public_transport === 'station' ? LocationType.STATION : LocationType.STOP,
      stop_timezone: 'Indian/Mauritius',
      stop_desc: busStopData.tags?.source,
    });

    spinner.succeed(`Successfully updated bus stop ${busStopId}`);
    logger.info(
      `Updated bus stop ${busStopId} with name: ${busStopData.tags?.name || 'Unnamed Stop'}`
    );
  } catch (error) {
    spinner.fail(`Failed to update bus stop ${busStopId}`);
    logger.error(`Error updating bus stop ${busStopId}:`, error);
  }
};

export default updateBusStop;
