import { Command } from 'commander';
import updateBusStop from './update';
import updateAggregateBusStop from './updateAll';

const busStopCommand = new Command('bus-stop').description('commands related to bus stops');

busStopCommand
  .command('import')
  .description('import bus stop from OSM')
  .argument('<id>', 'id of the bus stop to grab from OSM and update in database')
  .action(async function (busStopId: string) {
    await updateBusStop(busStopId);
  });

busStopCommand
  .command('import-all')
  .description('import all bus stops')
  .option(
    '-f, --force',
    'update data with latest instead of skipping if bus stop already exists',
    false
  )
  .action(async function (options: { force: boolean }) {
    await updateAggregateBusStop({ force: options.force });
  });

export default busStopCommand;
