import winston from "winston";

const logConfiguration = {
  transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(logConfiguration);

function logInfo(message: string, meta: any = {}) {
  logger.info(message, meta);
}

function logError(error: Error, meta: any = {}) {
  logger.error(error.message, meta);
}

export default {
  logInfo,
  logError,
};
