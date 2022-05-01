import React from "react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import missingUserImage from '../../public/new-user-icon.png';
import styles from './EditProfileForm.module.css';

interface Props {
  profile: User;
  handleSaveClick: () => void;
}

export function EditProfileForm( { profile, handleSaveClick }: Props ) {
  const { data: session } = useSession();
  console.log( 'Session: ', session );

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    console.log( 'Event:', e );
  }

  return (
    <form method="POST" onSubmit={( e ) => handleSubmit( e )} className={styles[ 'form' ]}>
      <div className={styles[ 'form__title' ]}>
        <div>
          <h2>Change Info</h2>
          <p>Changes will be reflected to every services (copied word for word from figma file)</p>
        </div>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <label htmlFor="name">Name</label>
        <input name="name" type={'text'}></input>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <label htmlFor="bio">Bio</label>
        <textarea rows={3} name="bio"></textarea>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <label htmlFor="phone">Phone</label>
        <input name="phone" type={'number'}></input>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <label htmlFor="email">Email</label>
        <input name="email" type={'email'}></input>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <label htmlFor="profile-picture">Change Photo</label>
        <input name="profile-picture"></input>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <label htmlFor="profile-picture">Change Photo</label>
        <input name="profile-picture"></input>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}