import { Config } from '../config';
import React from 'react';

export interface ConfigContextProps {
  config: Config;
}

export interface ConfigContext {
  config: Config;
}

export const ConfigContext = React.createContext<ConfigContext>(null as any);

export const ConfigContextProvider = (props: React.PropsWithChildren<ConfigContextProps>) => {
  return <ConfigContext.Provider value={props}>{props.children}</ConfigContext.Provider>;
};
