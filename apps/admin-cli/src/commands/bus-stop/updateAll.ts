import type { NewStop } from '@mobouzer/database-schema';
import { stop } from '@mobouzer/database-schema';
import { LocationType } from '@mobouzer/shared';
import { sql } from 'drizzle-orm';
import { uniqBy } from 'lodash';
import { getAllBusStops } from '../../api/overpass';
import { db } from '../../db';
import logger from '../../utils/logger';
import ora from '../../utils/ora';

const updateAllBusStops = async ({ force }: { force: boolean }): Promise<unknown> => {
  const spinner = ora('Fetching bus stop data from Overpass').start();

  try {
    const allBusStops = await getAllBusStops();

    if (!allBusStops) {
      return spinner.fail(`No bus stops found`);
    }

    spinner.text = `Found ${allBusStops.length} bus stops.`;
    spinner.info('Updating bus stops in database');

    const busStopData: NewStop[] = uniqBy(allBusStops, 'id').map((busStop) => {
      return {
        stop_id: busStop.id.toString(),
        stop_lat: busStop.lat,
        stop_long: busStop.lon,
        stop_name: busStop.tags?.name || 'Unnamed Stop',
        location_type:
          busStop.tags?.public_transport === 'station' ? LocationType.STATION : LocationType.STOP,
        stop_timezone: 'Indian/Mauritius',
        stop_desc: busStop.tags?.source,
      };
    });

    let query = db.insert(stop).values(busStopData).$dynamic().returning();

    if (force) {
      query = query.onConflictDoUpdate({
        target: stop.stop_id,
        set: {
          stop_lat: sql`EXCLUDED.stop_lat`,
          stop_long: sql`EXCLUDED.stop_long`,
          stop_name: sql`EXCLUDED.stop_name`,
          location_type: sql`EXCLUDED.location_type`,
          stop_timezone: sql`EXCLUDED.stop_timezone`,
          stop_desc: sql`EXCLUDED.stop_desc`,
        },
      });
    }

    const result = await query;

    spinner.succeed(`Successfully updated ${result.length} bus stops`);
    logger.info(`Updated ${result.length} bus stops`);
  } catch (error) {
    spinner.fail(`Failed to update all bus stops`);
    logger.error(`Error updating all bus stops:`, error);
  }
};

export default updateAllBusStops;
