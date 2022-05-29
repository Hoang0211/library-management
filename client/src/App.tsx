import React from 'react';

import Header from './components/layout/Header';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Login />
      {/* <Home /> */}
    </div>
  );
};

export default App;
