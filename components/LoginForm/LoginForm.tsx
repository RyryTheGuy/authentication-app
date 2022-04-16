import { signIn } from "next-auth/react";
import styles from '../SignUpForm/SignUpForm.module.css';
import utilStyles from '../../styles/util.module.css';
import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string,
  password: string
}

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSignUpSubmit: SubmitHandler<Inputs> = async ( data ) => {
    console.log( data );
    await signIn( 'credentials', { email: data.email, password: data.password, callbackUrl: `${process.env.NEXTAUTH_URL}/` } );
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit( onSignUpSubmit )} className="form">
        <div className={styles[ 'form-input' ]}>
          <i className={"fas fa-envelope " + styles[ 'form-input__icon' ]}></i>
          <input
            autoComplete="username"
            type='email'
            placeholder="Email"
            className={styles[ 'form-input__input' ]}
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
        </div>
        {errors.email && <span className={utilStyles[ 'error_message' ]}>{errors.email.message}</span>}

        <div className={styles[ 'form-input' ]}>
          <i className={"fas fa-lock " + styles[ 'form-input__icon' ]}></i>
          <input
            autoComplete="current-password"
            type='password'
            placeholder="Password"
            className={styles[ 'form-input__input' ]}
            {...register(
              'password',
              {
                required: {
                  value: true,
                  message: 'Password is required'
                },
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                }
              }
            )}
          />
        </div>
        {errors.password && <span className={utilStyles[ 'error-message' ]}>{errors.password.message}</span>}

        <button type="submit" className={utilStyles[ 'primary-button' ]}>Login</button>
      </form >
    </div>
  );
};