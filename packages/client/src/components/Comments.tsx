import { Flex, Spinner, Text, UnorderedList, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { useGetComments } from '../hooks/useGetComments';
import { useRequiredParams } from '../utils/useRequiredParams';
import { Comment } from './Comment';

export const Comments = () => {
  const { postId } = useRequiredParams<{ postId: string }>();
  const { data, isLoading } = useGetComments(postId);

  const comments = _.map(data, (comment) => {
    return (
      <Comment
        id={comment.id}
        username={comment.username}
        comment={comment.comment}
        createdAt={comment.created_at}
      />
    );
  });

  const noComments = (
    <VStack w="100%" spacing={0} h="500px" justifyContent={'center'}>
      <VscCommentDiscussion size={'50px'} />
      <Text>No comments yet</Text>
      <Text>Be the first to leave one</Text>
    </VStack>
  );

  if (isLoading) {
    return <Spinner size="xl" alignSelf={'center'} />;
  }

  return (
    <Flex borderTopWidth={1} borderTopColor="gray" w="100%">
      {_.isEmpty(data) ? (
        noComments
      ) : (
        <UnorderedList mt={5} w="100%" ml={0}>
          {comments}
        </UnorderedList>
      )}
    </Flex>
  );
};
