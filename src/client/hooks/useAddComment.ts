import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { apiUrl } from '../constants';
import { getCommentsQueryKey } from './useGetComments';

interface CommentVariables {
  token: string;
  postId: string;
  comment: string;
}

const addComment = async (variables: CommentVariables): Promise<void> => {
  const { data } = await axios(`${apiUrl}/posts/${variables.postId}/comments/add`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${variables.token}`,
    },
    data: variables,
  });
  return data;
};

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getCommentsQueryKey(postId));
    },
  });
};
