import { loadCommands, program } from './structures/command';
import logger from './utils/logger';

loadCommands().then(() => {
  logger.debug(`CLI arguments: ${process.argv.join(', ')}`);

  program.parse(process.argv);
  process.disconnect();
});
