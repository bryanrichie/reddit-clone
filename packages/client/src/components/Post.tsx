import { HStack, Image, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import { MdOutlineModeComment } from 'react-icons/md';
import { Timestamp } from './Timestamp';
import { CommentCount } from './CommentCount';
import { VoteButtons } from './VoteButtons';
import React from 'react';
import * as Types from '../types';

interface Props {
  postId: string;
  post: Types.Post;
}

export const Post = (props: Props) => {
  const { postId, post } = props;

  const postBg = useColorModeValue('white', 'gray.700');
  const postBorder = useColorModeValue('gray.700', 'white');

  const isTitleOnlyPost = !post.text && !post.url;
  const content =
    post.text && !post.url ? (
      <Text pb={2}>{post.text}</Text>
    ) : (
      <Image pb={2} alignSelf={'center'} maxH={'300px'} objectFit={'cover'} src={post.url ?? ''} />
    );

  return (
    <VStack
      key={post.id}
      borderRadius="md"
      bg={postBg}
      border="1px"
      borderColor={postBorder}
      p={2}
      w={[null, '100%', '90%', '80%', '70%', '60%']}
      mx="auto"
      minH="150px"
      align="flex-start"
    >
      <HStack spacing={2} align="flex-start" w="100%">
        <VoteButtons
          postId={postId}
          voteStatus={post.vote_status}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
        />
        <VStack align={'left'} w={'100%'} spacing={0}>
          <HStack>
            <Text fontSize={'xs'}>
              Posted by <b>{post.username}</b>
            </Text>
            <Timestamp createdAt={post.created_at} />
          </HStack>
          <Text fontWeight={'extrabold'} fontSize={'2xl'}>
            {_.upperFirst(post.title)}
          </Text>
          {!isTitleOnlyPost ? content : null}
        </VStack>
      </HStack>
      <HStack fontWeight="bold" pl={'50px'} w="100%">
        <MdOutlineModeComment color="#718096" size={'20px'} />
        <CommentCount commentCount={post.comment_count} />
      </HStack>
    </VStack>
  );
};
