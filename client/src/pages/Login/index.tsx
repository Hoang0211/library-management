import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import './_login.scss';

const Login = () => {
  const handleSucess = () => {};

  const clientId =
    '305036799412-m3i8638rrtmqqa4pu90k9167evp9sndo.apps.googleusercontent.com';

  return (
    <main className='login'>
      <div className='login__container'>
        <p className='title'>Log In</p>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={handleSucess} />
        </GoogleOAuthProvider>
      </div>
    </main>
  );
};

export default Login;
