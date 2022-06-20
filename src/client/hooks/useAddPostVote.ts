import React from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { getPostVotesQueryKey } from './useGetPostVotes';

interface PostVoteVariables {
  token: string;
  postId: string;
  vote: boolean;
}

const addPostVote = async (variables: PostVoteVariables): Promise<void> => {
  const { data } = await axios(`http://localhost:8080/posts/${variables.postId}/votes`, {
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

  return useMutation(addPostVote, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getPostVotesQueryKey(postId));
    },
  });
};
