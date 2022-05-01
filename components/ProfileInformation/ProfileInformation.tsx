import React from "react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import missingUserImage from '../../public/new-user-icon.png';
import styles from './ProfileInformation.module.css';

interface Props {
  profile: User;
  handleEditClick: () => void;
}

export function ProfileInformation( { profile, handleEditClick }: Props ) {
  const { data: session } = useSession();

  return (
    <div className={styles[ 'form' ]}>
      <div className={styles[ 'form__title' ]}>
        <div>
          <h2>Profile</h2>
          <p>Some info may be visible to other people</p>
        </div>

        {/* Only allow edits on your own profile */}
        {session.user.id === profile.id
          ? <div className={styles[ 'edit-btn' ]} onClick={handleEditClick}>Edit</div>
          : <div></div>
        }
      </div>

      <div className={styles[ 'form__cell' ]}>
        <div className={styles[ 'form__cell-title' ]}>PHOTO</div>
        <div className={styles[ 'form__cell-info' ]}>
          <Image src={profile.image ?? missingUserImage} alt='Profile Picture' width={100} height={100} />
        </div>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <div className={styles[ 'form__cell-title' ]}>NAME</div>
        <div className={styles[ 'form__cell-info' ]}>{profile.name}</div>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <div className={styles[ 'form__cell-title' ]}>BIO</div>
        <div className={styles[ 'form__cell-info' ]}>{profile.bio ?? ''}</div>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <div className={styles[ 'form__cell-title' ]}>PHONE</div>
        <div className={styles[ 'form__cell-info' ]}>{profile.phone ?? ''}</div>
      </div>

      <div className={styles[ 'form__cell' ]}>
        <div className={styles[ 'form__cell-title' ]}>EMAIL</div>
        <div className={styles[ 'form__cell-info' ]}>{profile.email}</div>
      </div>
    </div>
  )
}