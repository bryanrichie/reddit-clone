import React from 'react';
import {
  AspectRatio,
  Box,
  Flex,
  Image,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { NavBar } from '../components/NavBar';
import { useGetPosts } from '../hooks/useGetPosts';
import _ from 'lodash';

export const HomePage = () => {
  const { data } = useGetPosts();

  const bodyBg = useColorModeValue('blue.200', 'blue.900');

  const posts = _.map(data, (post) => {
    const isTitleOnlyPost = !post.text && !post.url;
    const content =
      post.text && !post.url ? (
        <Text>{post.text}</Text>
      ) : (
        <Image alignSelf={'center'} maxH={'300px'} objectFit={'cover'} src={post.url ?? ''} />
      );

    return (
      <ListItem key={post.id} listStyleType={'none'} p={5} borderRadius="md" bg={'white'}>
        <Flex>
          <VStack align={'left'} w={'100%'}>
            <Text fontWeight={'extrabold'} fontSize={'2xl'}>
              {_.upperFirst(post.title)}
            </Text>
            {!isTitleOnlyPost ? content : null}
          </VStack>
        </Flex>
      </ListItem>
    );
  }).reverse();

  return (
    <Flex bg={bodyBg} h={'100vh'} flexDir="column">
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
