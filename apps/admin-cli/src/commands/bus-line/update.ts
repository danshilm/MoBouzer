import ora from '../../utils/ora';

const updateBusLine = async ({
  id,
  direction,
  options,
}: {
  id: string;
  direction: 'forward' | 'reverse';
  options: {
    busStops: boolean;
    ways: boolean;
  };
}) => {
  const spinner = ora('Working...').start();

  spinner.succeed('Done');
};

export default updateBusLine;
