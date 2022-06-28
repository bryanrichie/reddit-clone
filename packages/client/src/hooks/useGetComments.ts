import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuthContext } from '../context/AuthContext';
import { Comment } from '../types';
import { useConfig } from './useConfig';

const getComments = async (
  url: string,
  postId: string,
  token?: string
): Promise<readonly Comment[]> => {
  const { data } = await axios(`${url}/posts/${postId}/comments`, {
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
  const { config } = useConfig();

  return useQuery<readonly Comment[], Error>(getCommentsQueryKey(postId), () =>
    getComments(config.apiUrl, postId, authToken)
  );
};
