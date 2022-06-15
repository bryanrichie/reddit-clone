import { Flex, HStack, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { useParams } from 'react-router-dom';
import { useGetComments } from '../hooks/useGetComments';
import { useRequiredParams } from '../utils/useRequiredParams';

export const Comments = () => {
  const { postId } = useRequiredParams();
  const { data, isLoading, error } = useGetComments((postId as string) ?? '');

  const comments = _.map(data, (comment) => {
    const timeNow = Date.now();
    const postTime = _.toInteger(comment.created_at);
    const age = Math.abs(timeNow - postTime) / 1000;
    const days = Math.floor(age / 86000);
    const hours = Math.floor(age / 3600) % 24;
    const minutes = Math.floor(age / 60) % 60;
    const seconds = Math.floor(age % 60);

    const commentAge = () => {
      if (days <= 0 && hours <= 0 && minutes <= 0) {
        return `${seconds} seconds`;
      } else if (days <= 0 && hours <= 0) {
        return `${minutes} minutes`;
      } else if (days <= 0) {
        return `${hours} hours`;
      } else {
        return `${days} days`;
      }
    };

    return (
      <ListItem key={comment.id} listStyleType={'none'} p={2}>
        <VStack align={'flex-start'} spacing={0}>
          <HStack align={'baseline'}>
            <Text fontWeight={'bold'} fontSize="lg">
              {comment.username}
            </Text>
            <Text fontSize={'xs'}>{commentAge()} ago</Text>
          </HStack>
          <Text fontSize={'sm'}>{comment.comment}</Text>
        </VStack>
      </ListItem>
    );
  }).reverse();

  const noComments = (
    <VStack w="100%" spacing={0} h="500px" justifyContent={'center'}>
      <VscCommentDiscussion size={'50px'} />
      <Text>No comments yet</Text>
      <Text>Be the first to leave one</Text>
    </VStack>
  );

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
