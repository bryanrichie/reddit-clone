import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useAuthContext } from '../context/AuthContext';
import { Post } from '../types';
import { useConfig } from './useConfig';

interface DeleteSinglePostVariables {
  token: string;
  postId: string;
}

const getSinglePost = async (url: string, postId: string, token?: string): Promise<Post> => {
  const { data } = await axios(`${url}/posts/${postId}`, {
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

const deleteSinglePost =
  (url: string) =>
  async (variables: DeleteSinglePostVariables): Promise<void> => {
    const { data } = await axios(`${url}/posts/${variables.postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useDeleteSinglePost = () => {
  const { config } = useConfig();

  return useMutation<void, Error, DeleteSinglePostVariables>(deleteSinglePost(config.apiUrl));
};
