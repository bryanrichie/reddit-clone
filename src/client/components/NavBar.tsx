import React from 'react';
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdAccountCircle, MdLogout, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bodyBg = useColorModeValue('blue.200', 'blue.900');
  const navBg = useColorModeValue('blue.100', 'blue.800');
  const navFont = useColorModeValue('blue.800', 'blue.100');
  const navFontBg = useColorModeValue('white', 'gray.700');
  const navHoverFont = useColorModeValue('white', 'blue.700');
  const navHoverBg = useColorModeValue('blue.800', 'blue.100');

  return (
    <Flex w={'100%'} h={'100vh'} flexDir="column">
      <HStack h={70} justifyContent={'space-between'} px="20px" bg={navBg}>
        <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="extrabold" color={navFont}>
          reddit clone
        </Text>
        <HStack>
          <Button
            bg={navFontBg}
            color={navFont}
            _hover={{ bg: navHoverBg, color: navHoverFont }}
            _focus={{ boxShadow: '0' }}
          >
            Create post
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              bg={navFontBg}
              color={navFont}
              _hover={{ bg: navHoverBg, color: navHoverFont }}
              _active={{ bg: navHoverBg, color: navHoverFont }}
              _focus={{ boxShadow: '0' }}
            >
              Account <ChevronDownIcon />
            </MenuButton>
            <MenuList bg={navHoverBg} color={navHoverFont}>
              <MenuItem
                _hover={{ bg: navFontBg, color: navFont }}
                _focus={{ bg: navHoverBg }}
                fontWeight="bold"
              >
                <MdAccountCircle size={'25px'} /> <Text ml="10px">Profile</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem _hover={{ bg: navFontBg, color: navFont }} fontWeight="bold">
                <MdLogout size={'25px'} />
                <Text ml="10px">Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            aria-label="dark-mode"
            bg={navFontBg}
            color={navFont}
            _hover={{ bg: navHoverBg, color: navHoverFont }}
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
