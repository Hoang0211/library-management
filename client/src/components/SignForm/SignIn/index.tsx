import React from 'react';

import './_signIn.scss';

const SignIn = () => {
  return (
    <form className='sign-in'>
      <h1 className='title'>Sign In</h1>
      <label className='label label-email' htmlFor='email'>
        Email
      </label>
      <input
        className='input input-email'
        id='email'
        type='text'
        placeholder='Enter your email'
      ></input>
      <label className='label label-password' htmlFor='password'>
        Password
      </label>
      <input
        className='input input-password'
        id='password'
        type='text'
        placeholder='Enter your password'
      ></input>
      <a className='link link-forget-pw' href=''>
        Forgot your password?
      </a>
      <a className='link link-sign-up' href=''>
        Sign up for new user
      </a>
      <button className='btn btn-submit' type='submit'>
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
