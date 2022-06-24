import axios from 'axios';
import { useMutation } from 'react-query';
import { apiUrl } from '../constants';

interface UserVariables {
  username: string;
  password: string;
}

type jwt = string;

const postLoginUser = async (variables: UserVariables): Promise<jwt> => {
  const { data } = await axios.post(`${apiUrl}/login`, variables);
  return data;
};

export const useLoginUser = () => {
  return useMutation<jwt, Error, UserVariables>(postLoginUser);
};
