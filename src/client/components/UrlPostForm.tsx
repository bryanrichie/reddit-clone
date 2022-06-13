import { Input, useColorModeValue, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useCreateUrlPost } from '../hooks/useCreatePost';

interface FormValues {
  title: string;
  url: string;
}

const validationSchema = yup
  .object()
  .shape({
    title: yup.string().max(300).required(),
    url: yup.string().url().required(),
  })
  .required();

export const UrlPostForm = () => {
  const createPostMutation = useCreateUrlPost();
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { authToken } = useAuth();

  const submitFont = useColorModeValue('blue.800', 'blue.100');
  const submitBg = useColorModeValue('white', 'gray.700');
  const submitHoverFont = useColorModeValue('white', 'blue.700');
  const submitHoverBg = useColorModeValue('blue.800', 'blue.100');
  const inputBorder = useColorModeValue('blue.800', 'blue.100');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    if (authToken) {
      return createPostMutation.mutateAsync({ ...data, token: authToken }).then((res) => {
        if (window.location.pathname == '/') {
          window.location.reload();
        }
        navigate('/', { replace: true });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Input
          {...register('title')}
          id="title"
          type="text"
          placeholder="Title"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputBorder}
          bg={'white'}
        />
        <Input
          {...register('url')}
          id="url"
          placeholder="Url"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputBorder}
          bg={'white'}
        />
        <Input
          type="submit"
          value="Post"
          alignSelf={'flex-end'}
          w={100}
          mt={-5}
          mr={4}
          borderRadius={50}
          color={submitFont}
          bg={submitBg}
          fontWeight="bold"
          _hover={{ color: submitHoverFont, bg: submitHoverBg }}
          _focus={{ boxShadow: 0 }}
          border={0}
        />
      </VStack>
    </form>
  );
};
