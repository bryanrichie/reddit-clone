import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useConfig } from './useConfig';
import { getCommentsQueryKey } from './useGetComments';
import { getPostsQueryKey } from './useGetPosts';
import { getRepliesQueryKey } from './useGetReplies';
import { getPostQueryKey } from './useGetSinglePost';

interface AddCommentVoteVariables {
  token: string;
  commentId: string;
  vote: boolean;
}

interface UpdateCommentVoteVariables {
  token: string;
  commentId: string;
  vote: boolean | null;
}

interface DeleteCommentVoteVariables {
  token: string;
  commentId: string;
}

const addCommentVote =
  (url: string) =>
  async (variables: AddCommentVoteVariables): Promise<void> => {
    const { data } = await axios(`${url}/comments/${variables.commentId}/vote/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useAddCommentVote = (parentId: string, postId: string) => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation<void, Error, AddCommentVoteVariables>(addCommentVote(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getCommentsQueryKey(postId));
      await queryClient.invalidateQueries(getRepliesQueryKey(parentId));
    },
  });
};

const updateCommentVote =
  (url: string) =>
  async (variables: UpdateCommentVoteVariables): Promise<void> => {
    const { data } = await axios(`${url}/comments/${variables.commentId}/vote/update`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useUpdateCommentVote = (parentId: string, postId: string) => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation<void, Error, UpdateCommentVoteVariables>(updateCommentVote(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getCommentsQueryKey(postId));
      await queryClient.invalidateQueries(getRepliesQueryKey(parentId));
    },
  });
};

const deleteCommentVote =
  (url: string) =>
  async (variables: DeleteCommentVoteVariables): Promise<void> => {
    const { data } = await axios(`${url}/comments/${variables.commentId}/vote/delete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useDeleteCommentVote = (parentId: string, postId: string) => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation<void, Error, DeleteCommentVoteVariables>(deleteCommentVote(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getCommentsQueryKey(postId));
      await queryClient.invalidateQueries(getRepliesQueryKey(parentId));
    },
  });
};
