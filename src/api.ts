import express from "express";
import config from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import { errorHandlerMiddleware } from "./middlewares";
import { logger } from "./libs";
import "./db/mongodb";

const { port, corsOrigins } = config;

const app = express();
app.use(cors({ origin: corsOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", routes);
app.use(errorHandlerMiddleware);

app.listen(port, () =>
  logger.logInfo(`✅  Ready on port http://localhost:${port}`)
);
