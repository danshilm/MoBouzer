import type { Route } from '@mobouzer/database-schema';
import { Command } from 'commander';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const testCommand = new Command('test').action(async () => {
  const busRoutesFilePath = path.join(__dirname, '../../config/data/bus-lines.json');
  const data = (await readFile(busRoutesFilePath)).toString();
  const parsedData = JSON.parse(data) as Route[];

  const updatedData = parsedData.slice(0, undefined).map((route) => {
    const newShortName = route.route_short_name?.replace(/\s?\(.+?\)/g, '');
    const cleanedShortName = newShortName?.replace(/(\s?\d+\s?)+$/, '');
    const cleanedLongName = route.route_long_name?.replace(/(\s?\d+\s?)+$/, '');
    const cleanedDesc = route.route_desc?.replace(/(\s?\d+\s?)+$/, '');

    return {
      ...route,
      route_short_name: cleanedShortName,
      route_long_name: cleanedLongName,
      route_desc: cleanedDesc,
    };
  });

  await writeFile(busRoutesFilePath, JSON.stringify(updatedData, undefined, 2));
});

export default testCommand;
