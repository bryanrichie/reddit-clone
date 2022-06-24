import axios from 'axios';
import { useQuery } from 'react-query';
import { DatabaseComment } from '../../server/services/database.service';
import { apiUrl } from '../constants';
import { useAuthContext } from '../context/AuthContext';

const getComments = async (postId: string, token?: string): Promise<readonly DatabaseComment[]> => {
  const { data } = await axios(`${apiUrl}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  return data;
};

export const getCommentsQueryKey = (postId: string) => ['comments', postId];

export const useGetComments = (postId: string) => {
  const { authToken } = useAuthContext();

  return useQuery<readonly DatabaseComment[], Error>(getCommentsQueryKey(postId), () =>
    getComments(postId, authToken)
  );
};
