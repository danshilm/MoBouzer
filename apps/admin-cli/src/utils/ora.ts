import baseOra from 'ora';
import logger from './logger';

/**
 * Custom ora instance that also logs to file whenever
 * the spinner "moves a step" to remove duplication
 */
class CustomOra {
  private oraInstance;

  constructor(options?: string | baseOra.Options) {
    this.oraInstance = baseOra(options);
  }

  start(text?: string) {
    logger.info(text);
    this.oraInstance.start(text);
    return this;
  }

  info(text?: string) {
    logger.info(text);
    this.oraInstance.info(text);
    return this;
  }

  succeed(text?: string) {
    logger.info(text);
    this.oraInstance.succeed(text);
    return this;
  }

  fail(text?: string) {
    logger.error(text);
    this.oraInstance.fail(text);
    return this;
  }

  set text(value: string) {
    logger.info(value);
    this.oraInstance.text = value;
  }
}

const ora = (options?: string | baseOra.Options) => {
  return new CustomOra(options);
};

export default ora;
