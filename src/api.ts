import express from "express";
import { PORT, CORS_ORIGINS } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import { errorHandlerMiddleware } from "./middlewares";
import "./db/mongodb";

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", routes);
app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(`✅  Ready on port http://localhost:${PORT}`)
);
