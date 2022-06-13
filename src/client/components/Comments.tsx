import { VStack, Text } from '@chakra-ui/react';
import { VscCommentDiscussion } from 'react-icons/vsc';
import React from 'react';

export const Comments = () => {
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
