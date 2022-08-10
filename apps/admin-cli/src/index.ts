import { loadCommands, program } from './structures/command';

loadCommands().then(() => {
  program.parse(process.argv);
});
