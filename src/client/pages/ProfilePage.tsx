import {
  Flex,
  useColorModeValue,
  VStack,
  Text,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import React from 'react';
import { EmailChangeModal } from '../components/EmailChangeModal';
import { NavBar } from '../components/NavBar';
import { PasswordChangeModal } from '../components/PasswordChangeModal';
import { UsernameChangeModal } from '../components/UsernameChangeModal';

export const ProfilePage = () => {
  const bodyBg = useColorModeValue('blue.200', 'blue.900');
  const settingsBg = useColorModeValue('white', 'gray.700');
  const changeFont = useColorModeValue('blue.800', 'blue.100');
  const changeHoverFont = useColorModeValue('white', 'blue.700');
  const changeHoverBg = useColorModeValue('blue.800', 'blue.100');

  const changeButton = () => {
    return (
      <Button
        alignSelf={'flex-end'}
        w={100}
        mt={-5}
        mr={4}
        borderRadius={50}
        color={changeFont}
        bg={'transparent'}
        fontWeight="bold"
        borderWidth={'medium'}
        borderColor={changeFont}
        _hover={{ color: changeHoverFont, bg: changeHoverBg }}
        _focus={{ boxShadow: 0 }}
        _active={{ color: changeHoverFont, bg: changeHoverBg }}
      >
        Change
      </Button>
    );
  };

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
            <Text fontSize={'sm'}>placeholder@gmail.com</Text>
          </VStack>
          <EmailChangeModal />
        </HStack>
        <HStack justify={'space-between'} w="100%" p={5}>
          <VStack align={'flex-start'} spacing={0}>
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Username
            </Text>
            <Text fontSize={'sm'}>Placeholder</Text>
          </VStack>
          <UsernameChangeModal />
        </HStack>
        <HStack justify={'space-between'} w="100%" p={5}>
          <VStack align={'flex-start'} spacing={0}>
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Change password
            </Text>
            <Text fontSize={'sm'}>Password must be at least 12 characters long</Text>
          </VStack>
          <PasswordChangeModal />
        </HStack>
      </VStack>
    </Flex>
  );
};
