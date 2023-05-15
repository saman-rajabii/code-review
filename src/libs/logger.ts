import * as winston from "winston";
import { format } from "logform";

const { printf } = format;
const formatter = printf(
  ({ level, message, timestamp }) => `${timestamp} ${level} ${message}`
);

const logConfiguration = {
  transports: [
    new winston.transports.Console({
      format: format.combine(format.timestamp(), formatter),
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

function logInfo(message: string, meta: any = {}) {
  logger.log("info", message, { detail: JSON.stringify(meta) });
}

function logError(message: string, error: Error) {
  logger.log("error", message, { error });
}

export default {
  logInfo,
  logError,
};
