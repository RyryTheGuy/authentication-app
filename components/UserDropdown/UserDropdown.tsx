import { signOut } from "next-auth/react";
import Link from "next/link"
import styles from './UserDropdown.module.css';

export function UserDropdown( { id }: { id: string } ) {
  return (
    <div className={styles[ 'dropdown-container' ]}>
      <Link href={`/profile/${id}`}>
        <a className={styles[ 'dropdown-container__options' ]}>
          <i className="fas fa-user"></i>
          My Profile
        </a>
      </Link>
      <Link href={'/'}>
        <a className={styles[ 'dropdown-container__options' ]}>
          <i className="fas fa-users"></i>
          {/* WIP */}
          Group Chat
        </a>
      </Link>
      <hr className={styles[ 'horizontal-rule' ]} />
      <div
        style={{ color: 'red' }}
        className={styles[ 'dropdown-container__options' ]}
        onClick={() => signOut()}
      >
        <i className="fas fa-sign-out-alt"></i>
        Log out
      </div>
    </div >
  )
}