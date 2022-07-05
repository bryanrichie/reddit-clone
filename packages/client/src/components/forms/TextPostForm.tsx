import { Button, Input, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
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

  const inputFocusBorder = useColorModeValue('blue.800', 'blue.100');
  const submitBg = useColorModeValue('blue.800', 'gray.700');
  const submitFont = useColorModeValue('white', 'blue.100');
  const submitHoverBg = useColorModeValue('blue.600', 'blue.100');
  const submitHoverFont = useColorModeValue('white', 'blue.700');

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
          focusBorderColor={inputFocusBorder}
          bg={'white'}
          color="black"
          borderWidth="1px"
          borderColor="black"
          _hover={{ borderWidth: '2px', borderColor: 'black' }}
        />
        <Textarea
          {...register('text')}
          id="text"
          placeholder="Text (optional)"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputFocusBorder}
          bg={'white'}
          h={250}
          color="black"
          borderWidth="1px"
          borderColor="black"
          _hover={{ borderWidth: '2px', borderColor: 'black' }}
        />
        <Button
          type="submit"
          alignSelf={'flex-end'}
          w={100}
          mt={-5}
          mr={4}
          borderRadius={50}
          bg={submitBg}
          color={submitFont}
          fontWeight="bold"
          _hover={{ bg: submitHoverBg, color: submitHoverFont }}
          _focus={{ boxShadow: 0 }}
          border={0}
        >
          Post
        </Button>
      </VStack>
    </form>
  );
};
