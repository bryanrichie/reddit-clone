import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuthContext } from '../context/AuthContext';
import { Post } from '../types';
import { useConfig } from './useConfig';

const getSinglePost = async (url: string, postId: string, token?: string): Promise<Post> => {
  const { data } = await axios(`${url}/post/${postId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });

  return data;
};

export const getPostQueryKey = (postId: string) => ['post', postId];

export const useGetSinglePost = (postId: string) => {
  const { authToken } = useAuthContext();
  const { config } = useConfig();

  return useQuery<Post, Error>(getPostQueryKey(postId), () =>
    getSinglePost(config.apiUrl, postId, authToken)
  );
};
