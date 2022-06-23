import { config } from 'dotenv';

config();

export interface Config {
  databaseUrl: string;
  isProduction: boolean;
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
    isProduction: getEnv('NODE_ENV') === 'production',
    jwtSecret: getEnv('JWT_SECRET'),
  };
};
