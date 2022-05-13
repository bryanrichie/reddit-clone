import React from 'react';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

export const LoginPage = () => {
  return (
    <Flex justifyContent="center" align="center" bgColor="#75b7ea" h="100vh">
      <Box bg="gray.200" w="500px" p={3} boxShadow="sm" borderRadius="lg">
        <Tabs variant="line" isFitted>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
            <Tab>Forgot Password</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <RegisterForm />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};
