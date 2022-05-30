import { config } from 'dotenv';

config();

export interface Config {
  databaseUrl: string;
  isProduction: string;
  jwtSecret: string;
}

export const getEnv = (value: string) => {
  const env = process.env[value];

  if (!env) {
    throw new Error(`Unable to retrieve ${value} from environmental variables`);
  } else {
    return env;
  }
};

export const fromEnv = (): Config => {
  return {
    databaseUrl: getEnv('DATABASE_URL'),
    isProduction: getEnv('NPM_CONFIG_PRODUCTION'),
    jwtSecret: getEnv('JWT_SECRET'),
  };
};
