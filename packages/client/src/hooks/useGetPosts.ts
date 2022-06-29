import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuthContext } from '../context/AuthContext';
import { Post } from '../types';
import { useConfig } from './useConfig';

const getPosts = async (url: string, token?: string): Promise<readonly Post[]> => {
  const { data } = await axios(`${url}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  return data;
};

export const getPostsQueryKey = () => ['posts'];

export const useGetPosts = () => {
  const { authToken } = useAuthContext();
  const { config } = useConfig();

  return useQuery<readonly Post[], Error>(getPostsQueryKey(), () =>
    getPosts(config.apiUrl, authToken)
  );
};
