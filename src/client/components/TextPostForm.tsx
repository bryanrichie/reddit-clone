import { Input, Textarea, useColorModeValue, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useCreateTextPost } from '../hooks/useCreatePost';

interface FormValues {
  title: string;
  text?: string;
}

const validationSchema = yup
  .object()
  .shape({
    title: yup.string().max(300).required(),
    text: yup.string().optional(),
  })
  .required();

export const TextPostForm = () => {
  const createPostMutation = useCreateTextPost();
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
      const request = {
        title: data.title,
        text: !_.isEmpty(data.text) ? data.text : null,
      };
      return createPostMutation.mutateAsync({ ...request, token: authToken }).then((res) => {
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
        <Textarea
          {...register('text')}
          id="text"
          placeholder="Text (optional)"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputBorder}
          bg={'white'}
          h={250}
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
