import { Button, Input, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAddComment } from '../../hooks/useAddComment';
import { useAuth } from '../../hooks/useAuth';
import { useRequiredParams } from '../../utils/useRequiredParams';

interface FormValues {
  comment: string;
}

const validationSchema = yup
  .object({
    comment: yup.string().max(10000).required(),
  })
  .required();

export const CommentsForm = () => {
  const { postId } = useRequiredParams<{ postId: string }>();
  const addCommentMutation = useAddComment(postId);
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
    resetField,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const onSubmit = React.useCallback(
    (data: FormValues) => {
      if (authToken) {
        const request = {
          postId: (postId as string) ?? '',
          comment: data.comment,
        };
        return addCommentMutation.mutateAsync({ ...request, token: authToken }).then((res) => {
          toast({
            position: 'top',
            title: 'Comment added!',
            status: 'success',
            duration: 5000,
          });
          resetField('comment');
        });
      }
    },
    [addCommentMutation]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={2}>
        <Textarea
          {...register('comment')}
          id="comment"
          placeholder="What do you think?"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputFocusBorder}
          borderRadius="0"
          bg={'white'}
          color="black"
          h={150}
          w={[300, 500, 650, 750, 900]}
          borderWidth="1px"
          borderColor="black"
          _hover={{ borderWidth: '2px', borderColor: inputHoverBorder }}
        />

        <Button
          type="submit"
          fontSize={'sm'}
          w={100}
          alignSelf="flex-end"
          borderRadius={50}
          borderWidth={2}
          borderColor={submitFont}
          bg={submitBg}
          color={submitFont}
          fontWeight="bold"
          _hover={{ bg: submitHoverBg, color: submitHoverFont }}
          _active={{ bg: submitHoverBg, color: submitHoverFont }}
          _focus={{ boxShadow: '0' }}
        >
          Comment
        </Button>
      </VStack>
    </form>
  );
};
