import axios from 'axios';
import { useMutation } from 'react-query';

interface UserVariables {
  username: string;
  password: string;
}

type jwt = string;

const postLoginUser = async (variables: UserVariables): Promise<jwt> => {
  const { data } = await axios.post('http://localhost:8080/login', variables);
  return data;
};

export const useLoginUser = () => {
  return useMutation<jwt, Error, UserVariables>(postLoginUser);
};
