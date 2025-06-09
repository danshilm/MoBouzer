import type { GFTSFeedFileName } from '@mobouzer/shared';
import { writeFile } from 'fs/promises';
import { isEqual } from 'lodash';
import { join } from 'path';
import logger from '../../utils/logger';
import ora from '../../utils/ora';

export abstract class GTFSFile {
  public data: Promise<Record<string, unknown>[]>;
  protected filename: GFTSFeedFileName;

  constructor(file: GFTSFeedFileName, initialise: () => Promise<Record<string, unknown>[]>) {
    this.filename = file;

    this.data = initialise();
  }

  public async writeToFile() {
    const spinner = ora(`Writing to file ${this.filename}`).start();

    try {
      const awaitedData = await this.data;
      const clonedData = JSON.parse(JSON.stringify(awaitedData)) as Record<string, unknown>[];

      const path = join(__dirname, '../../../config/gtfs', `${this.filename}.txt`);

      const headers = Object.keys(
        clonedData.reduce((prev, current) => {
          const prevKeys = Object.keys(prev);
          const currentKeys = Object.keys(current);

          if (!isEqual(prevKeys, currentKeys)) {
            prevKeys.forEach((prevKey) => {
              current[prevKey] = prev[prevKey];
            });
          }

          return current;
        })
      );

      const columnDelimiter = ',';

      const data = `${headers.join(columnDelimiter)}\n\n${awaitedData
        .map((value) => {
          return headers
            .map((header) => {
              const containsDelimiter = value[header]?.toString().includes(columnDelimiter);
              return containsDelimiter ? `"${value[header]}"` : value[header] ?? '';
            })
            .join(columnDelimiter);
        })
        .join('\n')}`;

      await writeFile(path, data, 'utf-8');
      spinner.succeed(`Done writing GTFS file ${this.filename}!`);
    } catch (error) {
      spinner.fail(`Failed to write GTFS file ${this.filename}`);
      logger.error(error);
    }
  }
}
