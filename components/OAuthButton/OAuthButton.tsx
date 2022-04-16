import { ClientSafeProvider, signIn } from "next-auth/react";
import utilStyles from '../../styles/util.module.css';

interface Props {
  provider: ClientSafeProvider;
}

export default function OAuthButton( { provider }: Props ) {
  return (
    <div className={utilStyles[ 'oauth' ]} onClick={() => signIn( provider.id, { callbackUrl: '/' } )}>
      <i className={`fab fa-${provider.id}`}></i>
    </div>
  )
}