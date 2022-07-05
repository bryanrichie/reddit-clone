import { Input, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { useCreateTextPost } from '../../hooks/useCreatePost';

interface Props {
  onClose: () => void;
}

interface FormValues {
  title: string;
  text?: string;
}

const validationSchema = yup
  .object({
    title: yup.string().max(300).required(),
    text: yup.string().max(40000).optional(),
  })
  .required();

export const TextPostForm = (props: Props) => {
  const { onClose } = props;
  const createPostMutation = useCreateTextPost();
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { authToken } = useAuth();
  const toast = useToast();

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

  const onSubmit = React.useCallback(
    (data: FormValues) => {
      if (authToken) {
        const request = {
          title: data.title,
          text: !_.isEmpty(data.text) ? data.text : null,
        };
        return createPostMutation.mutateAsync({ ...request, token: authToken }).then((res: any) => {
          onClose();
          toast({
            position: 'top',
            title: 'Post successfully created!',
            status: 'success',
            duration: 5000,
          });
          navigate(`/post/${res.id}`, { replace: true });
        });
      }
    },
    [createPostMutation]
  );

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
          color="black"
        />
        <Textarea
          {...register('text')}
          id="text"
          placeholder="Text (optional)"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputBorder}
          bg={'white'}
          h={250}
          color="black"
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
