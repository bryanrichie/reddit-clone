import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { useParams } from 'react-router-dom';
import { useGetComments } from '../hooks/useGetComments';

export const Comments = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data, isLoading, error } = useGetComments(postId ?? '');

  return (
    <VStack
      borderTopWidth={1}
      borderTopColor="gray"
      w="100%"
      spacing={0}
      h="500px"
      justifyContent={'center'}
    >
      <VscCommentDiscussion size={'50px'} />
      <Text>No comments yet</Text>
      <Text>Be the first to leave one</Text>
    </VStack>
  );
};
