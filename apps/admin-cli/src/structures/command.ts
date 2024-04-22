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
      const commandGroup: Command = require(`${path}/index`).default;

      logger.debug(
        `Loading command ${commandGroup.name()} with subcommands ${commandGroup.commands
          .map((c) => c.name())
          .join(', ')}`
      );

      program.addCommand(commandGroup);
    } else {
      const command: Command = require(path).default;

      logger.debug(`Loading command ${command.name()}`);
      program.addCommand(command);
    }
  }
};

export const program = new Command('mobouzer');
