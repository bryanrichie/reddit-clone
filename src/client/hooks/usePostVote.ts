import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { apiUrl } from '../constants';
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

const addPostVote = async (variables: AddPostVoteVariables): Promise<void> => {
  const { data } = await axios(`http://localhost:8080/posts/${variables.postId}/votes/add`, {
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

  return useMutation<void, Error, AddPostVoteVariables>(addPostVote, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostQueryKey(postId));
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};

const updatePostVote = async (variables: UpdatePostVoteVariables): Promise<void> => {
  const { data } = await axios(`http://localhost:8080/posts/${variables.postId}/votes/update`, {
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

  return useMutation<void, Error, UpdatePostVoteVariables>(updatePostVote, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostQueryKey(postId));
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};

const deletePostVote = async (variables: DeletePostVoteVariables): Promise<void> => {
  const { data } = await axios(`${apiUrl}/posts/${variables.postId}/votes/delete`, {
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

  return useMutation<void, Error, DeletePostVoteVariables>(deletePostVote, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostQueryKey(postId));
      await queryClient.invalidateQueries(getPostsQueryKey());
    },
  });
};
