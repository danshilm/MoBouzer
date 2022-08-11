import { join } from 'path';
import * as winston from 'winston';

const hformat = winston.format.printf(({ level, label, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]${label ? `[${label}]` : ''}: ${message} `;
  if (Object.keys(metadata).length > 0) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.File({
      filename: join(__dirname, '../../config/logs/mobouzer-cli.log'),
      format: winston.format.combine(winston.format.splat(), winston.format.timestamp(), hformat),
    }),
  ],
});

export default logger;
