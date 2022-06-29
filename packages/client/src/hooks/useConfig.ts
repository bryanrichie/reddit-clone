import React from 'react';
import { ConfigContext } from '../context/ConfigContext';

export const useConfig = () => {
  return React.useContext(ConfigContext);
};
