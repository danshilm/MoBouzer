import { writeFile } from 'fs/promises';
import { isEqual } from 'lodash';
import { join } from 'path';
import { firebaseStore } from '../../firebase/config';
import type { GFTSFeedFileName } from '../../interfaces/gtfs';
import logger from '../../utils/logger';
import ora from '../../utils/ora';

export abstract class GTFSFile {
  public data: Promise<Record<string, unknown>[]>;
  protected filename: GFTSFeedFileName;

  constructor(file: GFTSFeedFileName, initialise: () => Promise<Record<string, unknown>[]>) {
    this.filename = file;

    this.data = initialise();
  }

  public abstract getRecordId(record: Record<string, unknown>): string;

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

  public async writeToFirestore() {
    const spinner = ora(`Saving GTFS file ${this.filename}`).start();

    const awaitedData = await this.data;
    logger.info(`Writing ${awaitedData.length} records to firestore for ${this.filename}`);

    for await (const record of awaitedData) {
      const recordId = this.getRecordId(record);
      const ref = firebaseStore.doc(`${this.filename}/${recordId}`);
      await ref.set(record);
    }

    spinner.succeed(`Done saving GTFS file ${this.filename}!`);
  }
}
