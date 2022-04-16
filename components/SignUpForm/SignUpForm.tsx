import { signIn } from "next-auth/react";
import styles from './SignUpForm.module.css';
import utilStyles from '../../styles/util.module.css';
import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string,
  password: string,
  confirmPassword?: string,
}

type SignUpResponse = {
  message: string,
  id: string
}

// Todo: make the input borders red if they have an error
export function SignUpForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const password = watch( 'password', '' );

  const onSignUpSubmit: SubmitHandler<Inputs> = async ( data ) => {
    try {
      const response = await fetch( '/api/signUp', {
        method: 'POST',
        body: JSON.stringify( { email: data.email, password: data.password } ),
        headers: { "Content-Type": "application/json" }
      } );
      const resData: SignUpResponse = await response.json();

      // Response will have the 'insertedId' of the newly created user in it
      await signIn( 'credentials', { id: resData.id, callbackUrl: `${process.env.NEXTAUTH_URL}/` } );
    } catch ( e ) {
      console.log( e ); // todo: make a better error catcher
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <h3>Join thousands of learners from around the world</h3>
      <p style={{ marginBottom: '2rem' }}>Master web development by making real-life projects. There are multiple paths for you to choose!</p>
      <form method="POST" onSubmit={handleSubmit( onSignUpSubmit )} className="form">
        <div className={styles[ 'form-input' ]}>
          <i className={"fas fa-envelope " + styles[ 'form-input__icon' ]}></i>
          <input
            name="username"
            id="username"
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
            name="new-password"
            id="new-password"
            autoComplete="new-password"
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
        {errors.password && <span className={utilStyles[ 'error_message' ]}>{errors.password.message}</span>}

        <div className={styles[ 'form-input' ]}>
          <i className={"fas fa-lock " + styles[ 'form-input__icon' ]}></i>
          <input
            type='password'
            placeholder="Confirm Password"
            className={styles[ 'form-input__input' ]}
            {...register(
              'confirmPassword',
              {
                required: true,
                validate: value => value === password || 'The passwords do not match' // Password validates or show custom error message
              }
            )}
          />
        </div>
        {errors.confirmPassword && <span className={utilStyles[ 'error-message' ]}>{errors.confirmPassword.message}</span>}

        <button type="submit" className={utilStyles[ 'primary-button' ]}>Start coding now</button>
      </form >
    </div>
  );
};