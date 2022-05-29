import { useState } from 'react';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '../redux/store';

export default function App(props) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState(props.colorScheme);

  const toggleColorScheme = (value) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  
  return (
    <>
      <Head>
        <title>Next.js + Mantine Template</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <ReduxProvider store={store}>
              <Component {...pageProps} />
            </ReduxProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
