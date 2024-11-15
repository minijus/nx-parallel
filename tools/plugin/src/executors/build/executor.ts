import { PromiseExecutor } from '@nx/devkit';
import { randomWait, RandomWaitExecutorOptions } from '../random-wait';

const runExecutor: PromiseExecutor<RandomWaitExecutorOptions> = async (options) => {
  await randomWait(options);
  return {
    success: true,
  };
};

export default runExecutor;
