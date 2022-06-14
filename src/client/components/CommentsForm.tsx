import { Input, Textarea, useColorModeValue, VStack, Flex } from '@chakra-ui/react';
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

export const CommentsForm = () => {
  const createPostMutation = useCreateTextPost();
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { authToken } = useAuth();

  const inputBorder = useColorModeValue('blue.800', 'blue.100');
  const submitFont = useColorModeValue('blue.800', 'blue.100');
  const submitButtonBg = useColorModeValue('white', 'gray.700');
  const submitHoverFont = useColorModeValue('white', 'blue.700');
  const submitHoverBg = useColorModeValue('blue.800', 'blue.100');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const navigate = useNavigate();

  const onSubmit = React.useCallback(
    (data: FormValues) => {
      // if (authToken) {
      //   const request = {
      //     title: data.title,
      //     text: !_.isEmpty(data.text) ? data.text : null,
      //   };
      //   return createPostMutation.mutateAsync({ ...request, token: authToken }).then((res) => {
      //     if (window.location.pathname == '/') {
      //       window.location.reload();
      //     }
      //     navigate('/', { replace: true });
      //   });
      // }
    },
    [createPostMutation]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={2}>
        <Textarea
          {...register('text')}
          id="comment"
          placeholder="What do you think?"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputBorder}
          borderRadius="0"
          bg={'white'}
          h={150}
          w={[400, 500, 700, 800, 900]}
        />
        <Input
          type="submit"
          value="Comment"
          fontSize={'sm'}
          w={100}
          alignSelf="flex-end"
          borderRadius={50}
          borderWidth={2}
          borderColor={submitFont}
          bg={submitButtonBg}
          color={submitFont}
          fontWeight="bold"
          _hover={{ bg: submitHoverBg, color: submitHoverFont }}
          _active={{ bg: submitHoverBg, color: submitHoverFont }}
          _focus={{ boxShadow: '0' }}
        />
      </VStack>
    </form>
  );
};
