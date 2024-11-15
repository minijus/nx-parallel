import { logger } from '@nx/devkit';

export interface RandomWaitExecutorOptions {
  min: number;
  max: number;
}

export async function randomWait({ min, max }: RandomWaitExecutorOptions): Promise<void> {
  const waitDurationInSeconds = Math.floor(Math.random() * max) + min;
  logger.info(`Waiting for ${waitDurationInSeconds} seconds`);
  await new Promise((resolve) => setTimeout(resolve, waitDurationInSeconds * 1000));
  logger.info(`Done waiting for ${waitDurationInSeconds} seconds`);
}
