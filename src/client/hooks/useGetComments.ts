import axios from 'axios';
import { useQuery } from 'react-query';
import { DatabaseComment } from '../../server/services/database.service';
import { useAuthContext } from '../context/AuthContext';

const getComments = async (token?: string): Promise<readonly DatabaseComment[]> => {
  const { data } = await axios('http://localhost:8080/comments', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  return data;
};

export const getCommentsQueryKey = () => ['comments'];

export const useGetComments = () => {
  const { authToken } = useAuthContext();

  return useQuery<readonly DatabaseComment[], Error>(getCommentsQueryKey(), () =>
    getComments(authToken)
  );
};
