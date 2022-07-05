import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { NavBar } from '../components/NavBar';
import { PostsList } from '../components/PostsList';

export const HomePage = () => {
  const bodyBg = useColorModeValue('blue.200', 'blue.900');

  return (
    <Flex bg={bodyBg} minH={'100vh'} flexDir="column" pb={5}>
      <NavBar />
      <PostsList />
    </Flex>
  );
};
