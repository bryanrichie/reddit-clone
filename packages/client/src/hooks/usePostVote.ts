import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useConfig } from './useConfig';
import { getPostsQueryKey } from './useGetPosts';
import { getPostQueryKey } from './useGetSinglePost';

interface AddPostVoteVariables {
  token: string;
  postId: string;
  vote: boolean;
}

interface UpdatePostVoteVariables {
  token: string;
  postId: string;
  vote: boolean | null;
}

interface DeletePostVoteVariables {
  token: string;
  postId: string;
}

const addPostVote =
  (url: string) =>
  async (variables: AddPostVoteVariables): Promise<void> => {
    const { data } = await axios(`${url}/posts/${variables.postId}/votes/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useAddPostVote = (postId: string) => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation<void, Error, AddPostVoteVariables>(addPostVote(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostQueryKey(postId));
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};

const updatePostVote =
  (url: string) =>
  async (variables: UpdatePostVoteVariables): Promise<void> => {
    const { data } = await axios(`${url}/posts/${variables.postId}/votes/update`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useUpdatePostVote = (postId: string) => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation<void, Error, UpdatePostVoteVariables>(updatePostVote(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostQueryKey(postId));
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};

const deletePostVote =
  (url: string) =>
  async (variables: DeletePostVoteVariables): Promise<void> => {
    const { data } = await axios(`${url}/posts/${variables.postId}/votes/delete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useDeletePostVote = (postId: string) => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation<void, Error, DeletePostVoteVariables>(deletePostVote(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostQueryKey(postId));
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};
