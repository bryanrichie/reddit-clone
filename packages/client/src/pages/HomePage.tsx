import {
  Flex,
  HStack,
  Image,
  Link,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import _ from 'lodash';
import { MdOutlineModeComment } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';
import { CommentCount } from '../components/CommentCount';
import { NavBar } from '../components/NavBar';
import { Timestamp } from '../components/Timestamp';
import { VoteButtons } from '../components/VoteButtons';
import { useGetPosts } from '../hooks/useGetPosts';

export const HomePage = () => {
  const { data, isLoading } = useGetPosts();

  const bodyBg = useColorModeValue('blue.200', 'blue.900');
  const postBg = useColorModeValue('white', 'gray.700');
  const postBorder = useColorModeValue('gray.700', 'white');
  const overflowGradient = useColorModeValue(
    'linear-gradient(transparent 200px, white)',
    'linear-gradient(transparent 200px, #2D3748)'
  );

  const posts = _.map(data, (post) => {
    const isTitleOnlyPost = !post.text && !post.url;
    const content =
      post.text && !post.url ? (
        <Text
          pb={2}
          maxH={'300px'}
          overflow="hidden"
          position={'relative'}
          _before={{
            content: `''`,
            w: `100%`,
            h: `100%`,
            position: `absolute`,
            left: `0`,
            top: `0`,
            background: `${overflowGradient}`,
          }}
        >
          {post.text}
        </Text>
      ) : (
        <Image
          pb={2}
          alignSelf={'center'}
          maxH={'300px'}
          objectFit={'cover'}
          src={post.url ?? ''}
        />
      );

    return (
      <ListItem
        key={post.id}
        listStyleType={'none'}
        borderRadius="md"
        bg={postBg}
        border="1px"
        borderColor={postBorder}
        p={2}
        minH="120px"
      >
        <HStack spacing={2} align="flex-start" h="100%">
          <VoteButtons
            postId={post.id}
            voteStatus={post.vote_status}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />
          <Link
            w="100%"
            minH="120px"
            as={ReactRouterLink}
            to={`/post/${post.id}`}
            _hover={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 0 }}
          >
            <VStack align="left" spacing={0} minH="120px">
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
            <HStack fontWeight="bold">
              <MdOutlineModeComment color="#718096" size={'20px'} />
              <CommentCount commentCount={post.comment_count} />
            </HStack>
          </Link>
        </HStack>
      </ListItem>
    );
  });

  const checkLoading = () => {
    if (isLoading) {
      return <Spinner size="xl" alignSelf={'center'} />;
    }
    return (
      <UnorderedList
        alignSelf={'center'}
        spacing={3}
        w={[null, '100%', '90%', '80%', '70%', '60%']}
        mx="auto"
      >
        {posts}
      </UnorderedList>
    );
  };

  return (
    <Flex bg={bodyBg} minH={'100vh'} flexDir="column" pb={5}>
      <NavBar />
      {checkLoading()}
    </Flex>
  );
};
