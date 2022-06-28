import React from 'react';
import { useLocalStorage } from 'react-use';
import decode from 'jwt-decode';
import { useLoginUser } from './useLoginUser';
import { useRegisterUser } from './useRegisterUser';
import { JwtToken } from '../types';

export interface Request {
  email: string;
  username: string;
  password: string;
}

export const useAuth = () => {
  const [token, setToken, remove] = useLocalStorage<string | undefined>('auth');

  const registerUserMutation = useRegisterUser();
  const loginUserMutation = useLoginUser();

  const registerAsync = React.useCallback(
    (request: Request) => {
      return registerUserMutation.mutateAsync(request).then((res) => {
        setToken(res);
      });
    },
    [registerUserMutation, setToken]
  );

  const register = {
    ...registerUserMutation,
    registerAsync,
  };

  const loginAsync = React.useCallback(
    (request: Omit<Request, 'email'>) => {
      return loginUserMutation.mutateAsync(request).then((res) => {
        setToken(res);
      });
    },
    [loginUserMutation, setToken]
  );

  const login = {
    ...loginUserMutation,
    loginAsync,
  };

  const logout = React.useCallback(() => remove(), [remove]);

  const isAuthenticated = React.useCallback(() => {
    if (!token) {
      return false;
    }
    const payload = decode<JwtToken>(token);
    const now = new Date().valueOf() / 1000;

    const isExpired = payload.exp > now;
    return isExpired;
  }, [token]);

  return {
    register,
    login,
    logout,
    isAuthenticated,
    authToken: token,
  };
};
