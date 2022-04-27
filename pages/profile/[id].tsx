import React from "react";
import { User } from "next-auth";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import styles from './[id].module.css';
import getProfile from "../../lib/profile";
import { ProfileInformation } from "../../components/ProfileInformation/ProfileInformation";

export default function Profile( { profile }: { profile: User } ) {
  const [ isEditing, setIsEditing ] = React.useState<boolean>( false );

  const renderProfileInformation = () => {
    if ( !isEditing ) {
      return <ProfileInformation profile={profile} handleEditClick={() => setIsEditing( true )} />
    }

    return <div onClick={() => setIsEditing( false )}>Edit Me!</div>
    // return <EditProfileForm profile={profile} handleBackClick={() => setIsEditing( false )} />
  }

  return (
    <div className={styles[ 'container' ]}>
      <Head>
        <title>Auth App | Home</title>
      </Head>

      <Navbar />

      <div className={styles[ 'profile-info' ]}>
        <header>
          <h1>Personal Info</h1>
          <h3>Basic info, like your name and photo</h3>
        </header>

        {renderProfileInformation()}
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