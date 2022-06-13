import {
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export const PasswordChangeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeFont = useColorModeValue('blue.800', 'blue.100');
  const changeHoverFont = useColorModeValue('white', 'blue.700');
  const changeHoverBg = useColorModeValue('blue.800', 'blue.100');
  const modalFont = useColorModeValue('blue.800', 'blue.100');
  const modalBg = useColorModeValue('blue.100', 'blue.800');
  const closeBg = useColorModeValue('white', 'gray.700');
  const closeHoverFont = useColorModeValue('white', 'blue.700');
  const closeHoverBg = useColorModeValue('blue.800', 'blue.100');

  return (
    <>
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
        onClick={onOpen}
      >
        Change
      </Button>
      <Modal
        size={'2xl'}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInRight"
        autoFocus={false}
      >
        <ModalOverlay backdropFilter="auto" backdropBlur={'2px'} />
        <ModalContent mx={5} bg={modalBg}>
          <ModalHeader color={modalFont} fontWeight="extrabold">
            Change password
          </ModalHeader>
          <ModalCloseButton
            bg={closeBg}
            _hover={{ color: closeHoverFont, bg: closeHoverBg }}
            _active={{ color: closeHoverFont, bg: closeHoverBg }}
            _focus={{ boxShadow: 0 }}
          />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
