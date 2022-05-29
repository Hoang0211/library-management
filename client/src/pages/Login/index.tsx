import React from 'react';

import SignIn from '../../components/SignForm/SignIn';
import SignUp from '../../components/SignForm/SignUp';
import './_login.scss';

const Login = () => {
  return (
    <main className='login'>
      <SignIn />
      {/* <SignUp /> */}
    </main>
  );
};

export default Login;
