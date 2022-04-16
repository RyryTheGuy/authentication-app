import React from 'react';
import { Session, User } from 'next-auth';
import Image from 'next/image';
import devChallengeLogo from '../../public/devchallenges.svg';
import missingPfp from '../../public/new-user-icon.png';
import styles from './Navbar.module.css';
import utilStyles from '../../styles/util.module.css';
import Script from 'next/script';
import { UserDropdown } from '../UserDropdown/UserDropdown';

export default function Navbar( { user }: { user: User } ) {
  const [ isDropdownActive, setIsDropdownActive ] = React.useState<boolean>( false );

  const renderDropdownArrow = () => isDropdownActive
    ? <i className="fas fa-angle-up" style={{ marginBottom: '-3px' }}></i>
    : <i className="fas fa-angle-down" style={{ marginBottom: '-3px' }}></i>;

  return (
    <>
      <nav className={styles[ 'nav' ]}>
        <div className={utilStyles[ 'logo-container--sm' ]}>
          <Image src={devChallengeLogo} alt="Dev Challenge Logo" layout="fill" />
        </div>
        <div
          className={styles[ 'user_dropdown' ]}
          onClick={() => setIsDropdownActive( !isDropdownActive )}
        >
          {/* User Icon */}
          <div className={utilStyles[ 'pfp-container--sm' ]}>
            <Image src={missingPfp} alt='Your profile picture' layout='fill' />
          </div>
          <p>{user.name ?? 'New User'}</p>
          {renderDropdownArrow()}

          {/* Dropdown */}
          {/* todo: redo this so clicking outside the dropdown will close it (JS eventlisteners) */}
          {isDropdownActive && <UserDropdown id={user.id} />}
        </div>
      </nav>
    </>
  )
}