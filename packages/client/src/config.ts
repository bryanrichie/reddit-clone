import _ from 'lodash';

export interface Config {
  apiUrl: string;
}

export const getEnv = (value: string) => {
  //@ts-ignore
  const env = import.meta.env[value];

  if (!env) {
    throw new Error(`Unable to retrieve ${value} from environmental variables`);
  } else {
    return env;
  }
};

export const fromEnv = (): Config => {
  return {
    apiUrl:
      getEnv('MODE') === 'production'
        ? 'https://r-reddit-c-clone.herokuapp.com'
        : 'http://localhost:8080',
  };
};
