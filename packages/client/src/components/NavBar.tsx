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

  const navBg = useColorModeValue('blue.100', 'blue.800');
  const navFont = useColorModeValue('blue.800', 'blue.100');
  const navButtonBg = useColorModeValue('white', 'gray.700');
  const navHoverFont = useColorModeValue('white', 'blue.700');
  const navHoverBg = useColorModeValue('blue.800', 'blue.100');
  const menuDivider = useColorModeValue('white', 'blue.700');

  return (
    <Flex w={'100%'} flexDir="column" mb={5}>
      <HStack h={70} justifyContent={'space-between'} px="20px" bg={navBg}>
        <Link
          as={ReactRouterLink}
          to="/"
          _hover={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 0 }}
        >
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="extrabold" color={navFont}>
            reddit clone
          </Text>
        </Link>
        <HStack>
          <CreatePostModal />
          <Menu>
            <MenuButton
              as={Button}
              bg={navButtonBg}
              color={navFont}
              fontWeight="bold"
              _hover={{ bg: navHoverBg, color: navHoverFont }}
              _active={{ bg: navHoverBg, color: navHoverFont }}
              _focus={{ boxShadow: '0' }}
            >
              Account <ChevronDownIcon />
            </MenuButton>
            <MenuList bg={navHoverBg} color={navHoverFont}>
              <Link as={ReactRouterLink} to="/profile" _hover={{ textDecoration: 'none' }}>
                <MenuItem
                  _hover={{ bg: navButtonBg, color: navFont }}
                  _focus={{ bg: navHoverBg }}
                  fontWeight="bold"
                >
                  <MdAccountCircle size={'25px'} /> <Text ml="10px">Profile</Text>
                </MenuItem>
              </Link>

              <MenuDivider bg={menuDivider} />
              <MenuItem _hover={{ bg: navButtonBg, color: navFont }} fontWeight="bold">
                <MdLogout size={'25px'} />
                <Logout />
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            aria-label="dark-mode"
            bg={navButtonBg}
            color={navFont}
            _hover={{ bg: navHoverBg, color: navHoverFont }}
            _active={{ bg: navHoverBg, color: navHoverFont }}
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
