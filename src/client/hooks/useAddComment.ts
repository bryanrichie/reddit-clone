import axios from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { getCommentsQueryKey } from './useGetComments';

interface CommentVariables {
  token: string;
  comment: string;
}

const addComment = async (variables: CommentVariables): Promise<void> => {
  const { data } = await axios('http://localhost:8080/comment/add', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${variables.token}`,
    },
    data: variables,
  });
  return data;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getCommentsQueryKey());
    },
  });
};
