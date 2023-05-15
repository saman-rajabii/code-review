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

interface MongoDB {
  host: string;
  databaseName: string;
  usename: string;
  password: string;
  port: string;
}
interface Config {
  port: number;
  corsOrigins: string[];
  database: MongoDB;
}

const config: Config = {
  port: parseInt(checkEnv("PORT"), 10),
  corsOrigins: checkEnv("CORS_ORIGINS", "http://localhost:3000").split(","),
  database: {
    host: checkEnv("MONGODB_HOST"),
    usename: checkEnv("MONGODB_USER"),
    password: checkEnv("MONGODB_PASSWORD"),
    databaseName: checkEnv("MONGODB_DATABASE"),
    port: checkEnv("MONGODB_DOCKER_PORT"),
  },
};

export default config;
