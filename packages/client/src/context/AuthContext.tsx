import React from 'react';
import { useAuth } from '../hooks/useAuth';

type AuthContextType = ReturnType<typeof useAuth>;

export const AuthContext = React.createContext<AuthContextType>({} as any);

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
};

export const useAuthContext: () => AuthContextType = () => React.useContext(AuthContext);
