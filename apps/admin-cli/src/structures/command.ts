import { Command } from 'commander';
import { lstat, readdir } from 'fs/promises';
import { join } from 'path';

export const loadCommands = async () => {
  const directory = join(__dirname, '../commands');

  for (const file of await readdir(directory)) {
    const path = join(directory, file);

    // is directory with commands inside
    if ((await lstat(path)).isDirectory()) {
      const { default: CommandGroup } = await import(`${path}/index`);
      program.addCommand(CommandGroup);
    } else {
      const { default: Command } = await import(path);
      program.addCommand(Command);
    }
  }
};

export const program = new Command('mobouzer');
