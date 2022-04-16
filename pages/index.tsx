import React from "react";
import Head from "next/head";
import styles from '../styles/Home.module.css';
import { signOut, getSession } from "next-auth/react";
import Navbar from '../components/Navbar/Navbar';
import { User } from "next-auth";
import Script from "next/script";

export default function Home() {
  const [ user, setUser ] = React.useState<User>( null );

  React.useEffect( () => {
    const session = getSession();
    session.then( session => setUser( session.user ) );
  }, [] );

  if ( !user ) {
    return <div>Loading...</div>    // todo: add a loading screen
  }

  return (
    <div className={styles[ 'container' ]}>
      <Head>
        <title>Auth App | Home</title>
      </Head>

      <Navbar user={user} />

      <div>Auth</div>
      <a onClick={() => signOut()}>Sign Out</a>

      <Script src={process.env.NEXT_PUBLIC_FONTAWESOME_KIT} crossOrigin='anonymous' />
    </div>
  )
};

Home.requireAuth = true;