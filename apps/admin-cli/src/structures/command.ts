import { Command } from 'commander';
import { lstat, readdir } from 'fs/promises';
import { join } from 'path';
import logger from '../utils/logger';

export const loadCommands = async () => {
  const directory = join(__dirname, '../commands');

  for (const file of await readdir(directory)) {
    const path = join(directory, file);

    // is directory with commands inside
    if ((await lstat(path)).isDirectory()) {
      const { default: CommandGroup }: { default: Command } = await import(`${path}/index`);

      logger.debug(
        `Loading command ${CommandGroup.name()} with subcommands ${CommandGroup.commands
          .map((c) => c.name())
          .join(', ')}`
      );

      program.addCommand(CommandGroup);
    } else {
      const { default: Command }: { default: Command } = await import(path);

      logger.debug(`Loading command ${Command.name()}`);
      program.addCommand(Command);
    }
  }
};

export const program = new Command('mobouzer');
