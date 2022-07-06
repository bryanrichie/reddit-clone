import { AspectRatio, HStack, Image, Text, useColorModeValue, VStack } from '@chakra-ui/react';
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

  const isTitleOnlyPost = !post.text && !post.url;
  const urlCheck = () => {
    if (_.includes(post.url, 'youtube')) {
      return (
        <AspectRatio ratio={16 / 9}>
          <iframe src={_.replace(post.url ?? '', 'watch?v=', 'embed/')} allowFullScreen />
        </AspectRatio>
      );
    }
    if (_.includes(post.url, 'youtu.be')) {
      return (
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={_.replace(post.url ?? '', 'youtu.be', 'youtube.com/embed/')}
            allowFullScreen
          />
        </AspectRatio>
      );
    }
    return <Image alignSelf={'center'} maxH={'300px'} objectFit={'cover'} src={post.url ?? ''} />;
  };

  const content = post.text && !post.url ? <Text pb={2}>{post.text}</Text> : urlCheck();

  return (
    <VStack
      key={post.id}
      borderRadius="md"
      bg={postBg}
      p={2}
      w={[null, '100%', '90%', '80%', '70%', '60%']}
      mx="auto"
      minH="150px"
      align="flex-start"
    >
      <HStack spacing={2} align="flex-start" w="100%" pr={2}>
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
      <HStack fontWeight="bold" pl={'50px'} w="100%" mt={2}>
        <MdOutlineModeComment color="#718096" size={'20px'} />
        <CommentCount commentCount={post.comment_count} />
      </HStack>
    </VStack>
  );
};
