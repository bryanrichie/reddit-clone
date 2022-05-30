import React from 'react';
import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Image,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { MdArrowCircleDown, MdArrowCircleUp, MdOutlineModeComment, MdLink } from 'react-icons/md';
import { NavBar } from '../components/NavBar';
import { useGetPosts } from '../hooks/useGetPosts';
import _ from 'lodash';

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
      <ListItem
        key={post.id}
        listStyleType={'none'}
        p={5}
        borderRadius="md"
        bg={postBg}
        border="1px"
        borderColor={postBorder}
      >
        <HStack justify={'space-between'} spacing={5}>
          <VStack alignSelf="flex-start">
            <MdArrowCircleUp size={'40px'} />
            <Text>0</Text>
            <MdArrowCircleDown size={'40px'} />
          </VStack>
          <VStack align={'left'} w={'100%'} spacing={0} alignSelf={'flex-start'}>
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
          <HStack>
            <MdLink color="#718096" size={'20px'} />
            <Text color={'gray.500'} size={'20px'}>
              Share
            </Text>
          </HStack>
        </HStack>
      </ListItem>
    );
  }).reverse();

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
