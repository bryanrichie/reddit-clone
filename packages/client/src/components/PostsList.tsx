import {
  AspectRatio,
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
import _ from 'lodash';
import React from 'react';
import { MdOutlineModeComment } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';
import { CommentCount } from '../components/CommentCount';
import { Timestamp } from '../components/Timestamp';
import { PostVoteButtons } from './PostVoteButtons';
import { useGetPosts } from '../hooks/useGetPosts';

export const PostsList = () => {
  const { data, isLoading } = useGetPosts();

  const postBg = useColorModeValue('white', 'gray.700');
  const overflowGradient = useColorModeValue(
    'linear-gradient(transparent 200px, white)',
    'linear-gradient(transparent 200px, #2D3748)'
  );

  const posts = _.map(data, (post) => {
    const isTitleOnlyPost = !post.text && !post.url;
    const urlCheck = () => {
      if (_.includes(post.url, 'youtube')) {
        return (
          <AspectRatio maxW="600px" ratio={16 / 9}>
            <iframe src={_.replace(post.url ?? '', 'watch?v=', 'embed/')} allowFullScreen />
          </AspectRatio>
        );
      }
      if (_.includes(post.url, 'youtu.be')) {
        return (
          <AspectRatio maxW="600px" ratio={16 / 9}>
            <iframe
              src={_.replace(post.url ?? '', 'youtu.be', 'youtube.com/embed/')}
              allowFullScreen
            />
          </AspectRatio>
        );
      }
      return <Image alignSelf="center" maxH="300px" objectFit="cover" src={post.url ?? ''} />;
    };

    const content =
      post.text && !post.url ? (
        <Text
          pb={2}
          maxH="300px"
          overflow="hidden"
          position="relative"
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
        urlCheck()
      );

    return (
      <ListItem key={post.id} listStyleType="none" borderRadius="md" bg={postBg} p={2} minH="120px">
        <HStack spacing={2} align="flex-start" h="100%" pr={2}>
          <PostVoteButtons
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
              <Text fontWeight="extrabold" fontSize="2xl">
                {_.upperFirst(post.title)}
              </Text>
              {!isTitleOnlyPost ? content : null}
            </VStack>
            <HStack fontWeight="bold" mt={2}>
              <MdOutlineModeComment color="#718096" size="20px" />
              <CommentCount commentCount={post.comment_count} />
            </HStack>
          </Link>
        </HStack>
      </ListItem>
    );
  });

  if (isLoading) {
    return <Spinner size="xl" alignSelf="center" />;
  }

  return (
    <UnorderedList
      alignSelf="center"
      spacing={3}
      w={[null, '100%', '90%', '80%', '70%', '60%']}
      mx="auto"
    >
      {posts}
    </UnorderedList>
  );
};
