import { Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Logout = () => {
  const { logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    toast({
      title: 'Logged out, see you later!',
      status: 'success',
      duration: 5000,
    });
    navigate('/login', { replace: true });
  };

  return (
    <Text ml="10px" onClick={onLogout}>
      Logout
    </Text>
  );
};
