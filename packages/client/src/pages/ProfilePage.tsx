import { Flex, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { NavBar } from '../components/NavBar';
import decode from 'jwt-decode';
import { JwtToken } from '../types';
import { useLocalStorage } from 'react-use';

export const ProfilePage = () => {
  const bodyBg = useColorModeValue('blue.200', 'blue.900');
  const settingsBg = useColorModeValue('white', 'gray.700');
  const [token] = useLocalStorage<string | undefined>('auth');
  const profileDetails = decode<JwtToken>(token ?? '');

  return (
    <Flex bg={bodyBg} minH={'100vh'} flexDir="column" pb={5}>
      <NavBar />
      <VStack
        bg={settingsBg}
        w={[null, '100%', '70%', '60%', '50%', '40%']}
        mx="auto"
        align={'flex-start'}
        spacing={5}
        borderRadius="lg"
      >
        <HStack justify={'space-between'} w="100%" p={5}>
          <VStack align={'flex-start'} spacing={0}>
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Email address
            </Text>
            <Text fontSize={'sm'}>{profileDetails.email}</Text>
          </VStack>
        </HStack>
        <HStack justify={'space-between'} w="100%" p={5}>
          <VStack align={'flex-start'} spacing={0}>
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Username
            </Text>
            <Text fontSize={'sm'}>{profileDetails.username}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Flex>
  );
};
