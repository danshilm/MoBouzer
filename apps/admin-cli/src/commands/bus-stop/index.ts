import { program } from '../../structures/command';
import { updateAggregateBusStop } from './updateAll';

const busStopCommand = program.command('bus-stop').description('commands related to bus stops');

busStopCommand
  .command('update')
  .description('update bus stop')
  .argument('<id>', 'id of the bus stop to grab from overpass and update firestore document')
  .option('-f, --force', "don't merge data, instead update document")
  .action(function (busStopId: string) {
    console.log(busStopId);
  });

busStopCommand
  .command('update-all')
  .description('update aggregate bus stops document')
  .option('-f, --force', "don't merge data, instead update document")
  .action(async function (options: { force: boolean }) {
    await updateAggregateBusStop(options.force);
  });

export default busStopCommand;
