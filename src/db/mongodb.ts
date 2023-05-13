import mongoose from "mongoose";
import { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } from "../config";

mongoose
  .connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`Connected to DB`);
  });

export default mongoose;
