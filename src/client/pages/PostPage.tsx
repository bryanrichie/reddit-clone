import { Flex, HStack, Image, Spinner, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { MdArrowCircleDown, MdArrowCircleUp, MdOutlineModeComment } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Comments } from '../components/Comments';
import { CommentsForm } from '../components/CommentsForm';
import { NavBar } from '../components/NavBar';
import { useGetSinglePost } from '../hooks/useGetSinglePost';
import { useRequiredParams } from '../utils/useRequiredParams';

export const PostPage = () => {
  const { postId } = useRequiredParams();
  const { data, isLoading, error } = useGetSinglePost(postId as string);

  const bodyBg = useColorModeValue('blue.200', 'blue.900');
  const postBg = useColorModeValue('white', 'gray.700');
  const postBorder = useColorModeValue('gray.700', 'white');

  const post = _.map(data, (post) => {
    const timeNow = Date.now();
    const postTime = _.toInteger(post.created_at);
    const age = Math.abs(timeNow - postTime) / 1000;
    const days = Math.floor(age / 86000);
    const hours = Math.floor(age / 3600) % 24;
    const minutes = Math.floor(age / 60) % 60;
    const seconds = Math.floor(age % 60);

    const postAge = () => {
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

    const commentCount = () => {
      if (_.toNumber(post.comment_count) < 1) {
        return <Text color={'gray.500'}>Comment</Text>;
      } else if (_.toNumber(post.comment_count) == 1) {
        return <Text color={'gray.500'}>{post.comment_count} Comment</Text>;
      }
      return <Text color={'gray.500'}>{post.comment_count} Comments</Text>;
    };

    const isTitleOnlyPost = !post.text && !post.url;
    const content =
      post.text && !post.url ? (
        <Text pt={3}>{post.text}</Text>
      ) : (
        <Image
          pt={3}
          alignSelf={'center'}
          maxH={'300px'}
          objectFit={'cover'}
          src={post.url ?? ''}
        />
      );
    return (
      <VStack
        key={post.id}
        borderRadius="md"
        bg={postBg}
        border="1px"
        borderColor={postBorder}
        p={5}
        spacing={3}
        w={[null, '100%', '90%', '80%', '70%', '60%']}
        mx="auto"
        align="flex-start"
      >
        <HStack spacing={5} w="100%">
          <VStack alignSelf="flex-start">
            <MdArrowCircleUp size={'40px'} />
            <Text>0</Text>
            <MdArrowCircleDown size={'40px'} />
          </VStack>
          <VStack align={'left'} w={'100%'} spacing={0} alignSelf={'flex-start'}>
            <HStack>
              <Text fontSize={'xs'}>
                Posted by <b>{post.username}</b>
              </Text>
              <Text fontSize={'xs'}> {postAge()} ago</Text>
            </HStack>

            <Text fontWeight={'extrabold'} fontSize={'2xl'}>
              {_.upperFirst(post.title)}
            </Text>
            {!isTitleOnlyPost ? content : null}
          </VStack>
        </HStack>
        <HStack pt={5} fontWeight="bold" pl={'60px'} spacing={10}>
          <HStack>
            <MdOutlineModeComment color="#718096" size={'20px'} />
            {commentCount()}
          </HStack>
        </HStack>
      </VStack>
    );
  });

  const checkLoading = () => {
    if (isLoading) {
      return <Spinner size="xl" alignSelf={'center'} />;
    }
    return (
      <>
        {post}
        <VStack
          mt={3}
          borderRadius="md"
          bg={postBg}
          border="1px"
          borderColor={postBorder}
          p={5}
          w={[null, '100%', '90%', '80%', '70%', '60%']}
          mx="auto"
          spacing={5}
        >
          <CommentsForm />
          <Comments />
        </VStack>
      </>
    );
  };

  return (
    <Flex bg={bodyBg} minH={'100vh'} flexDir="column" pb={5}>
      <NavBar />
      {checkLoading()}
    </Flex>
  );
};
