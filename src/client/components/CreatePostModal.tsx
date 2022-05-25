import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { TextPostForm } from './TextPostForm';
import { UrlPostForm } from './UrlPostForm';

export const CreatePostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navFont = useColorModeValue('blue.800', 'blue.100');
  const navFontBg = useColorModeValue('white', 'gray.700');
  const navHoverFont = useColorModeValue('white', 'blue.700');
  const navHoverBg = useColorModeValue('blue.800', 'blue.100');

  return (
    <>
      <Button
        bg={navFontBg}
        color={navFont}
        _hover={{ bg: navHoverBg, color: navHoverFont }}
        _focus={{ boxShadow: '0' }}
        onClick={onOpen}
      >
        Create post
      </Button>

      <Modal size={'2xl'} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={'none'} backdropFilter="auto" backdropBlur={'2px'} />
        <ModalContent mx={5}>
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="line" isFitted>
              <TabList>
                <Tab>Post</Tab>
                <Tab>Images & Videos</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TextPostForm />
                </TabPanel>
                <TabPanel>
                  <UrlPostForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
