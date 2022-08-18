import { program } from '../../structures/command';
import updateAggregateBusLine from './updateAll';

const busLineCommand = program.command('bus-line').description('commands related to bus lines');

busLineCommand
  .command('update-all')
  .description('update aggregate bus lines document')
  .option('-f, --force', "don't merge data, instead update document")
  .action(async function (options: { force: boolean }) {
    await updateAggregateBusLine(options.force);
  });

export default busLineCommand;
