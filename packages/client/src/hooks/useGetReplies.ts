import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuthContext } from '../context/AuthContext';
import { Comment } from '../types';
import { useConfig } from './useConfig';

const getReplies = async (
  url: string,
  parentId: string,
  token?: string
): Promise<readonly Comment[]> => {
  const { data } = await axios(`${url}/comments/${parentId}/replies`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  return data;
};

export const getRepliesQueryKey = (parentId: string) => ['replies', parentId];

export const useGetReplies = (parentId: string) => {
  const { authToken } = useAuthContext();
  const { config } = useConfig();

  return useQuery<readonly Comment[], Error>(getRepliesQueryKey(parentId), () =>
    getReplies(config.apiUrl, parentId, authToken)
  );
};
