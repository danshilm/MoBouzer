import { Argument } from 'commander';
import { program } from '../../structures/command';
import updateBusLine from './update';
import updateAggregateBusLine from './updateAll';

const busLineCommand = program.command('bus-line').description('commands related to bus lines');

busLineCommand
  .command('update')
  .description('update bus line and its stops and/or ways')
  .argument('<id>', 'id of the bus line to grab from overpass and update in firestore')
  .addArgument(
    new Argument('[direction]', 'direction of the bus line')
      .default('forward')
      .choices(['forward', 'reverse'])
  )
  .option('--bus-stops', 'only update bus-line stops', false)
  .option('--ways', 'only update bus-line ways', false)
  .action(async function (
    id: string,
    direction: 'forward' | 'reverse',
    options: { busStops: boolean; ways: boolean }
  ) {
    await updateBusLine({ id, direction, options });
  });

busLineCommand
  .command('update-all')
  .description('update aggregate bus lines document')
  .option('-f, --force', "don't merge data, instead update document", false)
  .action(async function (options: { force: boolean }) {
    await updateAggregateBusLine({ force: options.force });
  });

export default busLineCommand;
