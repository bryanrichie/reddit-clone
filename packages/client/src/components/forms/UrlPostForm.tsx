import { Input, useColorModeValue, useToast, VStack, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { useCreateUrlPost } from '../../hooks/useCreatePost';

interface Props {
  onClose: () => void;
}

interface FormValues {
  title: string;
  url: string;
}

const validationSchema = yup
  .object({
    title: yup.string().max(300).required(),
    url: yup.string().url().required(),
  })
  .required();

export const UrlPostForm = (props: Props) => {
  const { onClose } = props;
  const createPostMutation = useCreateUrlPost();
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { authToken } = useAuth();
  const toast = useToast();

  const inputFocusBorder = useColorModeValue('blue.800', 'blue.100');
  const inputHoverBorder = useColorModeValue('black', 'white');
  const submitBg = useColorModeValue('blue.800', 'white');
  const submitFont = useColorModeValue('white', 'blue.800');
  const submitHoverBg = useColorModeValue('blue.600', 'gray.400');
  const submitHoverFont = useColorModeValue('white', 'blue.800');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const youtubeCheck = _.some(['youtube', 'youtu.be'], (s) => _.includes(data.url, s));
    const imgUrlExtension = data.url.slice(
      (Math.max(0, data.url.lastIndexOf('.')) || Infinity) + 1
    );
    const validUrlExtensions = ['jpeg', 'jpg', 'png', 'gif', 'gifv', 'apng', 'avif', 'svg', 'webp'];
    const urlValidation = _.includes(validUrlExtensions, imgUrlExtension);

    if (!youtubeCheck && !urlValidation) {
      toast({
        position: 'top',
        title: 'Invalid image url.',
        description: 'Please make sure your url contains a valid image extension.',
        status: 'error',
        duration: 5000,
      });
    }
    if (authToken) {
      return createPostMutation.mutateAsync({ ...data, token: authToken }).then((res: any) => {
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
          focusBorderColor={inputFocusBorder}
          bg={'white'}
          color="black"
          borderWidth="1px"
          borderColor="black"
          _hover={{ borderWidth: '2px', borderColor: inputHoverBorder }}
        />
        <Input
          {...register('url')}
          id="url"
          placeholder="Url"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputFocusBorder}
          bg={'white'}
          color="black"
          borderWidth="1px"
          borderColor="black"
          _hover={{ borderWidth: '2px', borderColor: inputHoverBorder }}
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
