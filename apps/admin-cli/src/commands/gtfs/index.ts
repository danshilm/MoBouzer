import { program } from '../../structures/command';
import { generateGtfsFiles } from './generate';

const gtfsCommand = program.command('gtfs').description('commands related to GTFS feeds');

gtfsCommand
  .command('generate')
  .description('generate GTFS feed for Mauritius')
  .action(async function () {
    await generateGtfsFiles();
  });

export default gtfsCommand;
