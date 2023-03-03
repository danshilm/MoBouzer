import ora from 'ora';
import AgencyFile from '../../lib/gtfs/agency';
import RoutesFile from '../../lib/gtfs/routes';
import StopsFile from '../../lib/gtfs/stops';

export const generateGtfsFiles = async () => {
  const spinner = ora('Initialising').start();

  try {
    spinner.text = 'Working';
    await Promise.all([
      AgencyFile.writeToFile(),
      StopsFile.writeToFile(),
      RoutesFile.writeToFile(),
    ]);
  } catch (error) {
    spinner.fail(`Failed to generate GTFS files: ${error}`);
  } finally {
    spinner.succeed('Done!');
  }
};