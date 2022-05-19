import React from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { useAuth } from './hooks/useAuth';

export function App() {
  return (
    <Flex>
      <VStack>
        <Text>Home</Text>
      </VStack>
    </Flex>
  );
}
