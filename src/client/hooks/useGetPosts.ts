import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../common/types';
import { DatabasePost } from '../../server/services/database.service';
import { useAuthContext } from '../context/AuthContext';

const getPosts = async (token?: string): Promise<readonly DatabasePost[]> => {
  const { data } = await axios('http://localhost:8080/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  return data;
};

export const getPostsQueryKey = () => ['posts'];

export const useGetPosts = () => {
  const { authToken } = useAuthContext();

  return useQuery<readonly DatabasePost[], Error>(getPostsQueryKey(), () => getPosts(authToken));
};
