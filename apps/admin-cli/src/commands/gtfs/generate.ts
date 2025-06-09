import AgencyFile from '../../lib/gtfs/agency';
import RoutesFile from '../../lib/gtfs/routes';
import StopsFile from '../../lib/gtfs/stops';
import ora from '../../utils/ora';

export const generateGtfsFiles = async (_flags: {
  agency?: boolean;
  routes?: boolean;
  stops?: boolean;
  all: boolean;
}) => {
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
    spinner.succeed('All done!');
  }
};
