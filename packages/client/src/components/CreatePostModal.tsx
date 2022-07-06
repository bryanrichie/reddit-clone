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

  const navButtonBg = useColorModeValue('blue.800', 'white');
  const navButtonFont = useColorModeValue('white', 'blue.800');
  const navButtonHoverBg = useColorModeValue('blue.600', 'gray.400');
  const navButtonHoverFont = useColorModeValue('white', 'blue.800');
  const modalBg = useColorModeValue('white', 'blue.800');
  const modalFont = useColorModeValue('blue.800', 'white');
  const modalCloseBg = useColorModeValue('blue.800', 'white');
  const modalCloseFont = useColorModeValue('white', 'blue.800');
  const modalTabBg = useColorModeValue('blue.800', 'white');
  const modalTabFont = useColorModeValue('white', 'blue.800');
  const modalTabSelectedBg = useColorModeValue('blue.600', 'gray.400');
  const modalTabSelectedFont = useColorModeValue('white', 'blue.800');

  return (
    <>
      <Button
        bg={navButtonBg}
        color={navButtonFont}
        fontWeight="bold"
        _hover={{ bg: navButtonHoverBg, color: navButtonHoverFont }}
        _active={{ bg: navButtonHoverBg, color: navButtonHoverFont }}
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
            bg={modalCloseBg}
            color={modalCloseFont}
            _hover={{ color: navButtonHoverFont, bg: navButtonHoverBg }}
            _active={{ color: navButtonHoverFont, bg: navButtonHoverBg }}
            _focus={{ boxShadow: 0 }}
          />
          <ModalBody>
            <Tabs variant="soft-rounded" isFitted>
              <TabList mx={4}>
                <Tab
                  bg={modalTabBg}
                  color={modalTabFont}
                  fontWeight="bold"
                  _selected={{ bg: modalTabSelectedBg, color: modalTabSelectedFont }}
                  _focus={{ boxShadow: 0 }}
                >
                  Text
                </Tab>
                <Tab
                  bg={modalTabBg}
                  color={modalTabFont}
                  fontWeight="bold"
                  _selected={{ bg: modalTabSelectedBg, color: modalTabSelectedFont }}
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
