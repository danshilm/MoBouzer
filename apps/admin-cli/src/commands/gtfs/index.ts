import { program } from '../../structures/command';

const gtfsCommand = program.command('gtfs').description('commands related to GTFS feeds');

gtfsCommand.command('generate').description('generate GTFS feed for Mauritius');

export default gtfsCommand;
