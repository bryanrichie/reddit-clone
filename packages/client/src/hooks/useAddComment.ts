import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useConfig } from './useConfig';
import { getCommentsQueryKey } from './useGetComments';

interface CommentVariables {
  token: string;
  postId: string;
  comment: string;
}

const addComment =
  (url: string) =>
  async (variables: CommentVariables): Promise<void> => {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/posts/${variables.postId}/comments/add`,
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation(addComment(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getCommentsQueryKey(postId));
    },
  });
};
