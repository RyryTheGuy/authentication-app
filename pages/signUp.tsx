import React from "react";
import Head from "next/head";
import Script from "next/script";
import { ClientSafeProvider, getProviders, getSession } from 'next-auth/react';
import OAuthButton from "../components/OAuthButton/OAuthButton";
import utilStyles from '../styles/util.module.css';
import styles from '../styles/FormPage.module.css';
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import Link from "next/link";
import Image from 'next/image';
import devChallengeLogo from '../public/devchallenges.svg';

interface Props {
  providers: ClientSafeProvider[];
}

function SignUp( { providers }: Props ) {
  return (
    <div className={styles[ 'container' ]}>
      <Head>
        <title>Auth App | Sign In</title>
      </Head>

      <section className={styles[ 'border-container' ]}>
        <div className={utilStyles[ 'logo-container' ]} >
          <Image src={devChallengeLogo} alt='Dev Challenge Logo' layout='fill' objectFit="fill" />
        </div>
        <SignUpForm />
        <p style={{ textAlign: 'center', margin: '1.5rem 0' }}>or continue with these social profiles</p>
        <div className={styles[ 'oauth-container' ]}>
          {Object.values( providers ).map( ( provider ) => (
            < OAuthButton key={provider.id} provider={provider} />
          ) )}
        </div>
        <div style={{ textAlign: 'center' }}>
          Already a member?{' '}
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </div>
      </section>

      <Script src={process.env.NEXT_PUBLIC_FONTAWESOME_KIT} crossOrigin='anonymous' />
    </div>
  )
}

export default SignUp;

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