import { program } from '../../structures/command';
import logger from '../../utils/logger';
import updateAggregateBusStop from './updateAll';

const busStopCommand = program.command('bus-stop').description('commands related to bus stops');

busStopCommand
  .command('update')
  .description('update bus stop')
  .argument('<id>', 'id of the bus stop to grab from overpass and update in firestore')
  .option('-f, --force', "don't merge data, instead update document")
  .action(function (busStopId: string) {
    logger.info(busStopId);
  });

busStopCommand
  .command('update-all')
  .description('update aggregate bus stops document')
  .option('-f, --force', "don't merge data, instead update document", false)
  .action(async function (options: { force: boolean }) {
    await updateAggregateBusStop({ force: options.force });
  });

export default busStopCommand;
