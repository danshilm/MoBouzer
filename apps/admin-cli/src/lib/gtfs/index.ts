import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { GFTSFeedFileName } from '../../interfaces/gtfs';

export class GTFSFile {
  public data: Promise<object[]>;
  protected filename: GFTSFeedFileName;

  constructor(file: GFTSFeedFileName, initialise: () => Promise<object[]>) {
    this.filename = file;

    this.data = initialise();
  }

  public async writeToFile() {
    try {
      const awaitedData = await this.data;

      const path = join(__dirname, '../../../config/gtfs', this.filename);

      const data = `${Object.keys(awaitedData[0]).join(',')}\n
	    ${awaitedData.map((value) => Object.values(value).join(',').concat('\n'))}
	    `;

      await writeFile(path, data, 'utf-8');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
