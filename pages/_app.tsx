import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
}

export default function MyApp( props: AppProps ) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <SessionProvider session={pageProps.session}>
        {Component.requireAuth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  )
}

// Gets the user to allow them into protected pages
// If no user is found then it redirects them to the login/sign-up page
function Auth( { children } ) {
  const { data: session, status } = useSession( { required: true } )
  const isUser = session?.user;

  if ( isUser ) {
    return children;
  }

  return <div>Loading...</div>
}