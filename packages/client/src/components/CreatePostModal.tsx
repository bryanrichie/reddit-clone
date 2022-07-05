import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { TextPostForm } from './forms/TextPostForm';
import { UrlPostForm } from './forms/UrlPostForm';

export const CreatePostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navFont = useColorModeValue('blue.800', 'blue.100');
  const navButtonBg = useColorModeValue('white', 'gray.700');
  const navHoverFont = useColorModeValue('white', 'blue.700');
  const navHoverBg = useColorModeValue('blue.800', 'blue.100');
  const modalFont = useColorModeValue('blue.800', 'blue.100');
  const modalBg = useColorModeValue('blue.100', 'blue.800');

  return (
    <>
      <Button
        bg={navButtonBg}
        color={navFont}
        fontWeight="bold"
        _hover={{ bg: navHoverBg, color: navHoverFont }}
        _active={{ bg: navHoverBg, color: navHoverFont }}
        _focus={{ boxShadow: '0' }}
        onClick={onOpen}
      >
        Create post
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
            Create a post
          </ModalHeader>
          <ModalCloseButton
            bg={navButtonBg}
            _hover={{ color: navHoverFont, bg: navHoverBg }}
            _active={{ color: navHoverFont, bg: navHoverBg }}
            _focus={{ boxShadow: 0 }}
          />
          <ModalBody>
            <Tabs variant="soft-rounded" isFitted>
              <TabList mx={4}>
                <Tab
                  color={modalFont}
                  fontWeight="bold"
                  _selected={{ color: navHoverFont, bg: navHoverBg }}
                  _focus={{ boxShadow: 0 }}
                >
                  Text
                </Tab>
                <Tab
                  color={modalFont}
                  fontWeight="bold"
                  _selected={{ color: navHoverFont, bg: navHoverBg }}
                  _focus={{ boxShadow: 0 }}
                >
                  Images & Videos
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TextPostForm onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <UrlPostForm onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
