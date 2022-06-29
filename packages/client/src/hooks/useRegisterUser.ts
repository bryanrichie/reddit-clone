import axios from 'axios';
import { useMutation } from 'react-query';
import { useConfig } from './useConfig';

export interface UserVariables {
  email: string;
  username: string;
  password: string;
}

type jwt = string;

const postRegisterUser =
  (url: string) =>
  async (variables: UserVariables): Promise<jwt> => {
    const { data } = await axios.post(`${url}/register`, variables);
    return data;
  };

export const useRegisterUser = () => {
  const { config } = useConfig();

  return useMutation<jwt, Error, UserVariables>(postRegisterUser(config.apiUrl));
};
