import React from 'react';
import Image from 'next/image';
import devChallengeLogo from '../../public/devchallenges.svg';
import missingPfp from '../../public/new-user-icon.png';
import styles from './Navbar.module.css';
import utilStyles from '../../styles/util.module.css';
import { UserDropdown } from '../UserDropdown/UserDropdown';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import Link from 'next/link';

export default function Navbar() {
  const [ isDropdownActive, setIsDropdownActive ] = React.useState<boolean>( false );
  const { data: session, status } = useSession();

  const renderDropdownArrow = () => isDropdownActive
    ? <i className="fas fa-angle-up" style={{ marginBottom: '-3px' }}></i>
    : <i className="fas fa-angle-down" style={{ marginBottom: '-3px' }}></i>;

  if ( status === 'loading' ) {
    return <div>loading...</div>    // todo: better profile loading
  }

  return (
    <>
      <nav className={styles[ 'nav' ]}>
        <Link href={'/'}>
          <a className={utilStyles[ 'logo-container--sm' ]}>
            <Image src={devChallengeLogo} alt="Dev Challenge Logo" layout="fill" />
          </a>
        </Link>
        <div
          className={styles[ 'user_dropdown' ]}
          onClick={() => setIsDropdownActive( !isDropdownActive )}
        >
          {/* User Icon & Name */}
          <div className={utilStyles[ 'pfp-container--sm' ]}>
            <Image src={missingPfp} alt='Your profile picture' layout='fill' />
          </div>
          <p>{session.user.name ?? 'New User'}</p>
          {renderDropdownArrow()}

          {/* Dropdown */}
          {isDropdownActive && <UserDropdown user={session.user} handleDropdownClose={setIsDropdownActive} />}
        </div>

        <Script src={process.env.NEXT_PUBLIC_FONTAWESOME_KIT} crossOrigin='anonymous' />
      </nav>
    </>
  )
}