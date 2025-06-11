import ora from '../../utils/ora';

const updateAggregateBusLine = async ({ force }: { force: boolean }): Promise<void> => {
  const spinner = ora('Initialising').start();

  spinner.succeed(`Done!`);
};

export default updateAggregateBusLine;
