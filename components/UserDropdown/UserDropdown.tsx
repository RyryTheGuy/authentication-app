import React from "react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link"
import styles from './UserDropdown.module.css';

interface Props {
  user: User;
  handleDropdownClose: ( close: boolean ) => void;
}

export function UserDropdown( { user, handleDropdownClose }: Props ) {
  const dropdownContainer = React.useRef<HTMLDivElement>( null );

  React.useEffect( () => {
    const closeDropdown = () => {
      handleDropdownClose( false );
    }

    window.addEventListener( 'click', closeDropdown );

    // Cleanup for the event listener
    return () => window.removeEventListener( 'click', closeDropdown );
  }, [ handleDropdownClose ] )

  return (
    <div className={styles[ 'dropdown-container' ]} ref={dropdownContainer}>
      <Link href={`/profile/${user.id}`}>
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