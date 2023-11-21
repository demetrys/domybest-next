import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';

import { ChakraProvider } from '@chakra-ui/react';

import { persist, store } from 'store';

import { NextPageWithLayout } from 'types/global';

import theme from 'styles/theme';

import {
  AppLoader,
  GlobalDialogs,
  MainLayout,
  NextShield,
  Notifier
} from 'components';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const isCustomLayout = Component.getLayout;
  const getLayout = isCustomLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#1A3E6D' />
          <meta
            name='description'
            content='Award-Winning Test Prep and Tutoring'
          />
          <link rel='shortcut icon' sizes='32x32' href='/favicon.ico' />
          <link rel='apple-touch-icon' sizes='192x192' href='/logo192.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <title>SAT Prep</title>
        </Head>
        <ChakraProvider theme={theme}>
          <NextShield>
            {isCustomLayout ? (
              getLayout(<Component {...pageProps} />)
            ) : (
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            )}
            <GlobalDialogs />
            <AppLoader />
            <Notifier />
          </NextShield>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
