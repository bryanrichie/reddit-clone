import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { DatabasePostVote } from '../../server/services/database.service';
import { useAuthContext } from '../context/AuthContext';

const getPostVotes = async (
  postId: string,
  token?: string
): Promise<readonly DatabasePostVote[]> => {
  const { data } = await axios(`http://localhost:8080/posts/${postId}/votes`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  return data;
};

export const getPostVotesQueryKey = (postId: string) => ['votes', postId];

export const useGetComments = (postId: string) => {
  const { authToken } = useAuthContext();

  return useQuery<readonly DatabasePostVote[], Error>(getPostVotesQueryKey(postId), () =>
    getPostVotes(postId, authToken)
  );
};
