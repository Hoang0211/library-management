import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import './_login.scss';

const Login = () => {
  const [token, setToken] = useState('');
  console.log('token:', token);
  const handleSucess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential;
    console.log(googleResponse);
    console.log('tokenId:', tokenId);

    const res = await axios.post(
      'http://localhost:5000/google-login',
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
    );
    console.log(res);
    const token = res.data.token;
    setToken(token);
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response:', response);
    } catch (error: any) {
      console.log('error:', error.response.data);
    }
  };

  const clientId =
    '305036799412-m3i8638rrtmqqa4pu90k9167evp9sndo.apps.googleusercontent.com';

  return (
    <main className='login'>
      <div className='login__container'>
        <p className='title'>Log In</p>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={handleSucess} />
        </GoogleOAuthProvider>
        <button onClick={getAllUsers}>Get all users</button>
      </div>
    </main>
  );
};

export default Login;
