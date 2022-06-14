import {
  Flex,
  HStack,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { MdArrowCircleDown, MdArrowCircleUp, MdLink, MdOutlineModeComment } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { useGetPosts } from '../hooks/useGetPosts';

export const HomePage = () => {
  const { data } = useGetPosts();

  const bodyBg = useColorModeValue('blue.200', 'blue.900');
  const postBg = useColorModeValue('white', 'gray.700');
  const postBorder = useColorModeValue('gray.700', 'white');
  const overflowGradient = useColorModeValue(
    'linear-gradient(transparent 200px, white)',
    'linear-gradient(transparent 200px, #2D3748)'
  );

  const posts = _.map(data, (post) => {
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

    const isTitleOnlyPost = !post.text && !post.url;
    const content =
      post.text && !post.url ? (
        <Text
          pt={3}
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
          pt={3}
          alignSelf={'center'}
          maxH={'300px'}
          objectFit={'cover'}
          src={post.url ?? ''}
        />
      );

    return (
      <Link
        as={ReactRouterLink}
        to={`/post/${post.id}`}
        key={post.id}
        _hover={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 0 }}
        p={5}
      >
        <ListItem
          listStyleType={'none'}
          borderRadius="md"
          bg={postBg}
          border="1px"
          borderColor={postBorder}
          p={5}
        >
          <HStack justify={'space-between'} spacing={5}>
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
                <Text fontSize={'xs'}>{postAge()} ago</Text>
              </HStack>
              <Text fontWeight={'extrabold'} fontSize={'2xl'}>
                {_.upperFirst(post.title)}
              </Text>
              {!isTitleOnlyPost ? content : null}
            </VStack>
          </HStack>
          <HStack pt={5} fontWeight="bold" ml={'60px'} spacing={10}>
            <HStack>
              <MdOutlineModeComment color="#718096" size={'20px'} />
              <Text color={'gray.500'}>Comments</Text>
            </HStack>
          </HStack>
        </ListItem>
      </Link>
    );
  });

  return (
    <Flex bg={bodyBg} minH={'100vh'} flexDir="column" pb={5}>
      <NavBar />
      <UnorderedList
        alignSelf={'center'}
        spacing={3}
        w={[null, '100%', '90%', '80%', '70%', '60%']}
        mx="auto"
      >
        {posts}
      </UnorderedList>
    </Flex>
  );
};
