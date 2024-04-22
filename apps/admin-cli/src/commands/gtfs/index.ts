import { program } from 'commander';
import { generateGtfsFiles } from './generate';
import { saveGtfsFiles } from './save';

const gtfsCommand = program.command('gtfs').description('commands related to GTFS feeds');

gtfsCommand
  .command('generate')
  .description('generate GTFS feed for Mauritius')
  .option('--agency')
  .option('--stops')
  .option('--routes')
  .option('--all', undefined, false)
  .action(async function (flags) {
    // TODO: use flags
    await generateGtfsFiles(flags);
  });

gtfsCommand
  .command('save')
  .description('Saves GTFS data to the database')
  .option('--all', undefined, false)
  .action(async function (flags) {
    // TODO: use flags
    await saveGtfsFiles(flags);
  });

export default gtfsCommand;
