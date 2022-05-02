import React from "react";
import { User } from "next-auth";
import Image from "next/image";
import missingUserImage from '../../public/new-user-icon.png';
import styles from './EditProfileForm.module.css';

interface Props {
  profile: User;
  handleSaveClick: () => void;
}

export function EditProfileForm( { profile, handleSaveClick }: Props ) {
  const [ updatedUser, setUpdatedUser ] = React.useState( { ...profile } );
  const [ newPassword, setNewPassword ] = React.useState<string>( '' );

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    console.log( 'Event:', e );
  }

  return (
    <form method="POST" onSubmit={( e ) => handleSubmit( e )} className={styles[ 'form' ]}>
      <div className={styles[ 'form-title' ]}>
        <div>
          <h2>Change Info</h2>
          <p>Changes will be reflected to every services (copied word for word from figma file)</p>
        </div>
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="profile-picture">Change Photo</label>
        <Image src={updatedUser.image ?? missingUserImage} alt="Your Profile Picture" width={100} height={100} />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="name">Name</label>
        <input className={styles[ 'form-cell__input' ]} name="name" type={'text'} value={updatedUser.name} onChange={( { target } ) => setUpdatedUser( { ...updatedUser, name: target.value } )} />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="bio">Bio</label>
        <textarea className={styles[ 'form-cell__input' ]} rows={3} name="bio" value={updatedUser.bio} onChange={( { target } ) => setUpdatedUser( { ...updatedUser, bio: target.value } )} />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="phone">Phone</label>
        <input className={styles[ 'form-cell__input' ]} name="phone" type={'tel'} pattern="/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im" value={updatedUser.phone} onChange={( { target } ) => setUpdatedUser( { ...updatedUser, phone: target.value } )} />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="email">Email</label>
        <input className={styles[ 'form-cell__input' ]} name="email" type={'email'} disabled={profile.oauth} value={updatedUser.email} onChange={( { target } ) => setUpdatedUser( { ...updatedUser, email: target.value } )} />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="password">Current Password</label>
        <input className={styles[ 'form-cell__input' ]} name="old-password" type={'password'} value={updatedUser.password} onChange={( { target } ) => setUpdatedUser( { ...updatedUser, password: target.value } )} />

        <label htmlFor="new-password">New Password</label>
        <input className={styles[ 'form-cell__input' ]} name="new-password" type={'password'} value={newPassword} onChange={( { target } ) => setNewPassword( target.value )} />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}