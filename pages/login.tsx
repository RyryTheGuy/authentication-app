/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import Script from "next/script";
import { ClientSafeProvider, getProviders, getSession, signIn } from 'next-auth/react';
import OAuthButton from "../components/OAuthButton/OAuthButton";
import styles from '../styles/FormPage.module.css';
import utilStyles from '../styles/util.module.css';
import { LoginForm } from "../components/LoginForm/LoginForm";
import Link from "next/link";
import Image from "next/image";
import devChallengeLogo from '../public/devchallenges.svg';

interface Props {
  providers: ClientSafeProvider[];
}

function Login( { providers }: Props ) {
  return (
    <div className={styles[ 'container' ]}>
      <Head>
        <title>Auth App | Login</title>
      </Head>

      <section className={styles[ 'border-container' ]}>
        <div className={utilStyles[ 'logo-container' ]} >
          <Image src={devChallengeLogo} alt='Dev Challenge Logo' layout='fill' objectFit="fill" />
        </div>
        <LoginForm />
        <p style={{ textAlign: 'center', margin: '1.5rem 0' }}>or continue with these social profiles</p>
        <div className={styles[ 'oauth-container' ]}>
          {Object.values( providers ).map( ( provider ) => (
            < OAuthButton key={provider.id} provider={provider} />
          ) )}
        </div>
        <div style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link href={`/signUp`}>
            <a>Sign Up</a>
          </Link>
        </div>
      </section >

      <Script src={process.env.NEXT_PUBLIC_FONTAWESOME_KIT} crossOrigin='anonymous' />
    </div >
  )
}

export default Login;

export async function getServerSideProps( context ) {
  const providers = await getProviders();

  // We don't want logged in users to access the log in page
  const session = await getSession( context );
  if ( session ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers: Object.values( providers ).filter( ( provider: ClientSafeProvider ) => provider.id !== 'credentials' ),
    }
  }
}