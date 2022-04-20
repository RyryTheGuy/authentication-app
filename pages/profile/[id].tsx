import React from "react";
import { User } from "next-auth";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import styles from './[id].module.css';
import getProfile from "../../lib/profile";

export default function Profile( { profile }: { profile: User } ) {
  return (
    <div className={styles[ 'container' ]}>
      <Head>
        <title>Auth App | Home</title>
      </Head>

      <Navbar />

      <div>
        {profile.id} - {profile.email}
      </div>
    </div>
  )
}

export async function getServerSideProps( context ) {
  const profile = await getProfile( context.query.id );

  // Redirects to a 404 if the profile does not exist
  if ( !profile ) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      // Must stringify and parse otherwise we get an error
      profile: JSON.parse( JSON.stringify( profile ) ),
    }
  }
}

Profile.requireAuth = true;