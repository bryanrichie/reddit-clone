import { Flex, Spinner, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { Comments } from '../components/Comments';
import { CommentsForm } from '../components/forms/CommentsForm';
import { NavBar } from '../components/NavBar';
import { Post } from '../components/Post';
import { useGetSinglePost } from '../hooks/useGetSinglePost';
import { useRequiredParams } from '../utils/useRequiredParams';

export const PostPage = () => {
  const { postId } = useRequiredParams<{ postId: string }>();
  const { data: post, isLoading, error } = useGetSinglePost(postId);

  const bodyBg = useColorModeValue('blue.200', 'blue.900');
  const postBg = useColorModeValue('white', 'gray.700');
  const postBorder = useColorModeValue('gray.700', 'white');

  const checkLoading = () => {
    if (isLoading) {
      return <Spinner size="xl" alignSelf={'center'} />;
    }

    if (!post || error) {
      return;
    }

    return (
      <>
        <Post postId={postId} post={post} />
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
