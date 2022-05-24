import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();

ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode="system" />
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
