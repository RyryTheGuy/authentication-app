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
    <div>
      <div className={styles[ 'form-title' ]}>
        <div>
          <h2>Profile</h2>
          <p>Some info may be visible to other people</p>
        </div>
        {/* Only allow edits on your own profile */}
        {session.user.id === profile.id
          ? <button onClick={handleEditClick}>Edit</button>
          : <div></div>
        }
      </div>

      <div>
        <div>PHOTO</div>
        <div>
          <Image src={profile.image ?? missingUserImage} alt='Profile Picture' width={100} height={100} />
        </div>
      </div>

      <div>
        <div>NAME</div>
        <div>{profile.name}</div>
      </div>

      <div>
        <div>BIO</div>
        <div>{profile.bio ?? ''}</div>
      </div>

      <div>
        <div>PHONE</div>
        <div>{profile.phone ?? ''}</div>
      </div>

      <div>
        <div>EMAIL</div>
        <div>{profile.email}</div>
      </div>
    </div>
  )
}