import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useConfig } from './useConfig';
import { getPostsQueryKey } from './useGetPosts';

interface TextPostVariables {
  token: string;
  title: string;
  text?: string | null;
}

interface UrlPostVariables {
  token: string;
  title: string;
  url: string;
}

const createTextPost =
  (url: string) =>
  async (variables: TextPostVariables): Promise<void> => {
    const { data } = await axios(`${url}/post/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useCreateTextPost = () => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation(createTextPost(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};

const createUrlPost =
  (url: string) =>
  async (variables: UrlPostVariables): Promise<void> => {
    const { data } = await axios(`${url}/post/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useCreateUrlPost = () => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation(createUrlPost(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};
