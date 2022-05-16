import axios from 'axios';
import { useMutation } from 'react-query';

interface UserVariables {
  email: string;
  username: string;
  password: string;
}

type jwt = string;

const postRegisterUser = async (variables: UserVariables): Promise<jwt> => {
  const { data } = await axios.post('http://localhost:8080/register', variables);
  return data;
};

export const useRegisterUser = () => {
  return useMutation<jwt, Error, UserVariables>(postRegisterUser);
};
