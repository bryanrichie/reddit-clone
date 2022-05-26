import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { NavBar } from '../components/NavBar';

export const HomePage = () => {
  const bodyBg = useColorModeValue('blue.200', 'blue.900');

  return (
    <Flex bg={bodyBg}>
      <NavBar />
    </Flex>
  );
};
