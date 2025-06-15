import type { NewRoute } from '@mobouzer/database-schema';
import { route } from '@mobouzer/database-schema';
import { VehicleType } from '@mobouzer/shared/src/enums/routes';
import { sql } from 'drizzle-orm';
import { db } from '../../db';
import logger from '../../utils/logger';
import ora from '../../utils/ora';
import { busCNTBusLines } from './datasource/buscnt';

const updateAllBusLines = async ({ force }: { force: boolean }): Promise<void> => {
  const spinner = ora('Initialising').start();

  try {
    const busLines = await busCNTBusLines;

    if (!busLines || busLines.length === 0) {
      spinner.fail('No bus lines found in the data source.');
      return;
    }
    spinner.info(`Found ${busLines.length} bus lines.`);
    spinner.info('Updating all bus lines in database');

    let query = db
      .insert(route)
      .values(
        busLines.map(
          (line) =>
            ({
              route_id: line.routecode,
              agency_id: 'ntc',
              route_type: VehicleType.BUS,
              route_short_name: line.routename,
              route_long_name: `${line.routecode} ${line.startstage} to ${line.endstage}`,
            }) satisfies NewRoute
        )
      )
      .returning()
      .$dynamic();

    if (force) {
      query = query.onConflictDoUpdate({
        target: route.route_id,
        set: {
          agency_id: 'ntc',
          route_type: VehicleType.BUS,
          route_short_name: sql`EXCLUDED.route_short_name`,
          route_long_name: sql`EXCLUDED.route_long_name`,
        },
      });
    }

    const result = await query.execute();

    spinner.succeed(`Successfully updated ${result.length} bus lines`);
    logger.info(`Updated ${result.length} bus lines`);
  } catch (error) {
    spinner.fail('Failed to update all bus lines');
    logger.error('Error updating all bus lines:', error);
  }
};

export default updateAllBusLines;
