import { config } from 'dotenv';

config();

export interface Config {
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
    jwtSecret: getEnv('JWT_SECRET'),
  };
};
