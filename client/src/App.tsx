import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
