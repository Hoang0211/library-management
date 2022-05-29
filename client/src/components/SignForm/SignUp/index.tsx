import React from 'react';

import './_signUp.scss';

const SignUp = () => {
  return (
    <form className='sign-up'>
      <h1 className='title'>Sign Up</h1>
      <label className='label label-first-name' htmlFor='first-name'>
        First Name
      </label>
      <input
        className='input input-first-name'
        id='first-name'
        type='text'
        placeholder='Enter your first name'
      ></input>
      <label className='label label-last-name' htmlFor='last-name'>
        Last Name
      </label>
      <input
        className='input input-last-name'
        id='last-name'
        type='text'
        placeholder='Enter your last name'
      ></input>
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
      <button className='btn btn-submit' type='submit'>
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
