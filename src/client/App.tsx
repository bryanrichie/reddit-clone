import React from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { useAuth } from './hooks/useAuth';
import { HomePage } from './pages/HomePage';
import { NavBar } from './components/NavBar';

export function App() {
  return <HomePage />;
}
