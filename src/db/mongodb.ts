import mongoose from "mongoose";
import config from "../config";
import { logger } from "../libs";

const { host, usename, password, databaseName, port } = config.database;

mongoose
  .connect(
    `mongodb://${usename}:${password}@${host}:${port}/${databaseName}?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    logger.logInfo(`Mongodb Connection was successful`);
  })
  .catch((err) => logger.logError("Mongodb Connection Error", err));

export default mongoose;
