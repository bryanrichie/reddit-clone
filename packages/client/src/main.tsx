import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { fromEnv } from './config';
import { AuthContextProvider } from './context/AuthContext';
import { ConfigContextProvider } from './context/ConfigContext';

const queryClient = new QueryClient();
const config = fromEnv();

ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode="system" />
    <React.StrictMode>
      <ConfigContextProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthContextProvider>
        </QueryClientProvider>
      </ConfigContextProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
