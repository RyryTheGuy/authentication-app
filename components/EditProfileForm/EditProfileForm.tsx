import React from "react";
import nextAuth, { User } from "next-auth";
import Image from "next/image";
import missingUserImage from '../../public/new-user-icon.png';
import styles from './EditProfileForm.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { updateProfile } from "../../lib/profile";

export type EditProfileInputs = {
  name?: string;
  bio?: string;
  phone?: string;
  email: string;
  currentPassword: string;
  newPassword?: string;
}

interface Props {
  profile: User;
  handleSaveClick: () => void;
}

export function EditProfileForm( { profile, handleSaveClick }: Props ) {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<EditProfileInputs>();
  const [ profileState, setProfileState ] = React.useState<User>( { ...profile } );
  // todo: make the form work and test!!!!!!!!!!!!!!!!!!!!!

  const onSaveEditedProfile: SubmitHandler<EditProfileInputs> = async ( data ) => {
    const res = await fetch( '/api/updateProfile', {
      method: 'PUT',
      body: JSON.stringify( { oldProfile: profile, updatedInfo: data } ),
      headers: { "Content-Type": "application/json" }
    } );
    // handleSaveClick();
  }

  return (
    <form onSubmit={handleSubmit( onSaveEditedProfile )} className={styles[ 'form' ]}>
      <div className={styles[ 'form-title' ]}>
        <div>
          <h2>Change Info</h2>
          <p>Changes will be reflected to every services (copied word for word from figma file)</p>
        </div>
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="profile-picture">Change Photo</label>
        <div>
          <Image src={profile.image ?? missingUserImage} alt="Your Profile Picture" width={100} height={100} />
        </div>
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="name">Name</label>
        <input
          placeholder="Enter your name..."
          className={styles[ 'form-cell__input' ]}
          name="name"
          type={'text'}
          value={profileState.name}
          {...register( 'name' )}
        />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="bio">Bio</label>
        <textarea
          placeholder="Enter your bio..."
          className={styles[ 'form-cell__input' ]}
          rows={3}
          name="bio"
          value={profileState.bio}
          {...register( 'bio' )}
        />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="phone">Phone</label>
        <input
          placeholder="Enter your phone..."
          className={styles[ 'form-cell__input' ]}
          name="phone"
          type={'tel'}
          pattern='^\+?\d{7,13}'
          value={profileState.phone}
          {...register( 'phone' )}
        />
      </div>

      <div className={styles[ 'form-cell' ]}>
        <label htmlFor="email">Email</label>
        <input
          placeholder="Enter your email..."
          className={styles[ 'form-cell__input' ]}
          name="email"
          type={'email'}
          disabled={profile.oauth}
          value={profileState.email}
          style={errors.email ? { border: '1px solid red' } : {}}
          {...register(
            'email',
            {
              required: {
                value: true,
                message: 'Email is required'
              }
            }
          )}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      {/* Only allow password changes on accounts not made with Oauth */}
      {!profile.oauth && (
        <div className={styles[ 'form-cell' ]}>
          <label htmlFor="password">Current Password</label>
          <input
            placeholder="Enter your current password..."
            className={styles[ 'form-cell__input' ]}
            name="old-password"
            type={'password'}
            style={errors.currentPassword ? { border: '1px solid red' } : {}}
            {...register(
              'currentPassword',
              {
                required: {
                  value: true,
                  message: 'Current password is required'
                },
                minLength: {
                  value: 8,
                  message: 'Your current password is at least 8 characters'
                }
              }
            )}
          />
          {errors.currentPassword && <span>{errors.currentPassword.message}</span>}

          <label htmlFor="new-password">New Password</label>
          <input
            placeholder="Enter your new password..."
            className={styles[ 'form-cell__input' ]}
            name="new-password"
            type={'password'}
            style={errors.newPassword ? { border: '1px solid red' } : {}}
            {...register(
              'newPassword',
              {
                minLength: {
                  value: 8,
                  message: 'Your new password must have at least 8 characters'
                }
              }
            )}
          />
          {errors.newPassword && <span>{errors.newPassword.message}</span>}
        </div>
      )}

      <div className={styles[ 'form-cell' ]}>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}