import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Returns from './pages/Returns';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute adminOnly={false}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/returns'
          element={
            <ProtectedRoute adminOnly={true}>
              <Returns />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
