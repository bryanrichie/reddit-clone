import axios from 'axios';
import { useMutation } from 'react-query';

interface TextPostVariables {
  token: string;
  title: string;
  text?: string | null;
}

interface UrlPostVariables {
  token: string;
  title: string;
  url: string;
}

const createTextPost = async (variables: TextPostVariables): Promise<void> => {
  const { data } = await axios('http://localhost:8080/post/create', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${variables.token}`,
    },
    data: variables,
  });
  return data;
};

export const useCreateTextPost = () => {
  return useMutation(createTextPost);
};

const createUrlPost = async (variables: UrlPostVariables): Promise<void> => {
  const { data } = await axios('http://localhost:8080/post/create', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${variables.token}`,
    },
    data: variables,
  });
  return data;
};

export const useCreateUrlPost = () => {
  return useMutation(createUrlPost);
};
