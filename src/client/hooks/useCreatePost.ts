import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { apiUrl } from '../constants';
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

const createTextPost = async (variables: TextPostVariables): Promise<void> => {
  const { data } = await axios('http://localhost:8080/post/create', {
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

  return useMutation(createTextPost, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};

const createUrlPost = async (variables: UrlPostVariables): Promise<void> => {
  const { data } = await axios(`${apiUrl}/post/create`, {
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

  return useMutation(createUrlPost, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};
