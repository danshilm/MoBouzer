import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, width=device-width"
        ></meta>
      </Head>
      <Component {...pageProps} />
      <Analytics />
      <Script
        defer
        data-domain="mobouzer.com"
        src="https://plausible.danshilm.com/js/script.js"
      ></Script>
    </>
  );
}

export default MyApp;
