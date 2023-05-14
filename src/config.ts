import dotenv from "dotenv";

dotenv.config();

const checkEnv = (envVar: string, defaultValue?: string) => {
  if (process.env[envVar] == undefined) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const PORT: number = parseInt(checkEnv("PORT"), 10);
export const CORS_ORIGINS = ["http://localhost:3000"];
export const DB_HOST = checkEnv("MONGODB_HOST");
export const DB_USER = checkEnv("MONGODB_USER");
export const DB_PASS = checkEnv("MONGODB_PASSWORD");
export const DB_NAME = checkEnv("MONGODB_DATABASE");
export const DB_PORT = checkEnv("MONGODB_DOCKER_PORT");
