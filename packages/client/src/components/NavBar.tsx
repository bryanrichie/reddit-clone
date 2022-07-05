import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { MdAccountCircle, MdLogout, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';
import { CreatePostModal } from './CreatePostModal';
import { Logout } from './Logout';

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const navBg = useColorModeValue('white', 'blue.800');
  const navHeaderFont = useColorModeValue('blue.800', 'white');
  const navButtonBg = useColorModeValue('blue.800', 'white');
  const navButtonFont = useColorModeValue('white', 'blue.800');
  const navButtonHoverBg = useColorModeValue('blue.600', 'blue.800');
  const navButtonHoverFont = useColorModeValue('white', 'white');

  const menuDivider = useColorModeValue('blue.800', 'white');

  return (
    <Flex w={'100%'} flexDir="column" mb={5}>
      <HStack h={70} justifyContent={'space-between'} px="20px" bg={navBg}>
        <Link
          as={ReactRouterLink}
          to="/"
          _hover={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 0 }}
        >
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="extrabold" color={navHeaderFont}>
            reddit clone
          </Text>
        </Link>
        <HStack>
          <CreatePostModal />
          <Menu>
            <MenuButton
              as={Button}
              bg={navButtonBg}
              color={navButtonFont}
              fontWeight="bold"
              _hover={{ bg: navButtonHoverBg, color: navButtonHoverFont }}
              _active={{ bg: navButtonHoverBg, color: navButtonHoverFont }}
              _focus={{ boxShadow: '0' }}
            >
              Account <ChevronDownIcon />
            </MenuButton>
            <MenuList bg={navButtonHoverBg} color={navButtonHoverFont}>
              <Link as={ReactRouterLink} to="/profile" _hover={{ textDecoration: 'none' }}>
                <MenuItem
                  _hover={{ bg: navButtonBg, color: navButtonFont }}
                  _focus={{ bg: navButtonHoverBg }}
                  fontWeight="bold"
                  py={3}
                >
                  <MdAccountCircle size={'25px'} /> <Text ml="10px">Profile</Text>
                </MenuItem>
              </Link>
              <MenuItem _hover={{ bg: navButtonBg, color: navButtonFont }} fontWeight="bold" py={3}>
                <MdLogout size={'25px'} />
                <Logout />
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            aria-label="dark-mode"
            bg={navButtonBg}
            color={navButtonFont}
            _hover={{ bg: navButtonHoverBg, color: navButtonHoverFont }}
            _active={{ bg: navButtonHoverBg, color: navButtonHoverFont }}
            _focus={{ boxShadow: '0' }}
            icon={
              colorMode === 'light' ? (
                <MdOutlineDarkMode size={'30px'} />
              ) : (
                <MdOutlineLightMode size={'30px'} />
              )
            }
            isRound={true}
            onClick={toggleColorMode}
          />
        </HStack>
      </HStack>
    </Flex>
  );
};
