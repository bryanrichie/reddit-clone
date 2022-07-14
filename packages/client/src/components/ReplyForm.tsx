import { Button, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAddReply } from '../hooks/useAddReply';
import { useAuth } from '../hooks/useAuth';
import { useRequiredParams } from '../utils/useRequiredParams';

interface Props {
  parentId: string;
}

interface FormValues {
  reply: string;
}

const validationSchema = yup
  .object({
    reply: yup.string().max(10000).required(),
  })
  .required();

export const ReplyForm = (props: Props) => {
  const { parentId } = props;
  const { postId } = useRequiredParams<{ postId: string }>();
  const addReplyMutation = useAddReply(parentId);
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
          postId: postId,
          parentId: parentId,
          reply: data.reply,
        };
        return addReplyMutation.mutateAsync({ ...request, token: authToken }).then((res) => {
          toast({
            position: 'top',
            title: 'Reply added!',
            status: 'success',
            duration: 5000,
          });
          resetField('reply');
        });
      }
    },
    [addReplyMutation]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={2}>
        <Textarea
          {...register('reply')}
          id="reply"
          placeholder="What do you think?"
          _placeholder={{ color: 'gray' }}
          focusBorderColor={inputFocusBorder}
          bg="white"
          color="black"
          alignSelf="flex-start"
          borderWidth="1px"
          borderColor="black"
          _hover={{ borderWidth: '2px', borderColor: inputHoverBorder }}
        />

        <Button
          type="submit"
          fontSize="sm"
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
          Reply
        </Button>
      </VStack>
    </form>
  );
};
