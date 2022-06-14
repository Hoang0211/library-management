import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { signIn } from '../../redux/actions';
import { AppState } from '../../types';
import './_login.scss';

const clientId =
  '305036799412-m3i8638rrtmqqa4pu90k9167evp9sndo.apps.googleusercontent.com';

const Login = () => {
  const dispatch = useDispatch<any>();

  const { user, token } = useSelector((state: AppState) => state.user);

  if (user) {
    return <Navigate to='/' />;
  }

  // console.log('token:', token);
  // console.log('user:', user);

  const handleSucess = (googleResponse: any) => {
    const googleTokenId = googleResponse.credential;
    dispatch(signIn(googleTokenId));
  };

  return (
    <main className='login'>
      <div className='login__container'>
        <p className='login__title'>Log In</p>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={handleSucess} />
        </GoogleOAuthProvider>
      </div>
    </main>
  );
};

export default Login;
