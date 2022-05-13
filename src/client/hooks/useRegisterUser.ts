import axios from 'axios';
import { useMutation } from 'react-query';

interface UserVariables {
  email: string;
  username: string;
  password: string;
}

const postUser = async (variables: UserVariables): Promise<void> => {
  const { data } = await axios.post('http://localhost:8080/register', variables);
  return data;
};

export const useRegisterUser = () => {
  return useMutation<void, Error, UserVariables>(postUser);
};
