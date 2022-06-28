import axios from 'axios';
import { useMutation } from 'react-query';
import { useConfig } from './useConfig';

export interface UserVariables {
  username: string;
  password: string;
}

type jwt = string;

const postLoginUser =
  (url: string) =>
  async (variables: UserVariables): Promise<jwt> => {
    const { data } = await axios.post(`${url}/login`, variables);
    return data;
  };

export const useLoginUser = () => {
  const { config } = useConfig();

  return useMutation<jwt, Error, UserVariables>(postLoginUser(config.apiUrl));
};
