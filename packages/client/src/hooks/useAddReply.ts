import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useConfig } from './useConfig';
import { getRepliesQueryKey } from './useGetReplies';

interface ReplyVariables {
  token: string;
  postId: string;
  parentId: string;
  reply: string;
}

const addReply =
  (url: string) =>
  async (variables: ReplyVariables): Promise<void> => {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/comments/${variables.parentId}/replies/add`,
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
      data: variables,
    });
    return data;
  };

export const useAddReply = (parentId: string) => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation(addReply(config.apiUrl), {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(getRepliesQueryKey(parentId));
    },
  });
};
