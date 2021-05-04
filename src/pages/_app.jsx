import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { AnimateSharedLayout } from 'framer-motion';

import { Global, css } from '@emotion/react';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css`
  :root {
    --primary-color: hsl(300, 77%, 46%);
  }
  body {
    -webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased`};
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          {(Component.PageTitle && `${Component.PageTitle} || Next TMS`) ||
            'Next TMS App'}
        </title>
      </Head>
      <GlobalStyles />
      <UserProvider>
        <AnimateSharedLayout>
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </UserProvider>
    </>
  );
}

export default App;
