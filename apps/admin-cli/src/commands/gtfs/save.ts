import AgencyFile from '../../lib/gtfs/agency';
import RoutesFile from '../../lib/gtfs/routes';
import StopsFile from '../../lib/gtfs/stops';
import ora from '../../utils/ora';

export async function saveGtfsFiles(_flags: { all: boolean }) {
  const spinner = ora('Initialising').start();

  try {
    spinner.text = 'Working';
    await Promise.all([
      AgencyFile.writeToFirestore(),
      StopsFile.writeToFirestore(),
      RoutesFile.writeToFirestore(),
    ]);
  } catch (error) {
    spinner.fail(`Failed to save GTFS files: ${error}`);
  } finally {
    spinner.succeed('All done!');
  }
}
