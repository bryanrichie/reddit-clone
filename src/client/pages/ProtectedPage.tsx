import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useGetUsers } from '../hooks/useGetUsers';

export const ProtectedPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <Flex>
      <Text>Protected Page</Text>
      {JSON.stringify(data, null, 2)}
    </Flex>
  );
};
