import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Returns from './pages/Returns';
import AuthorDetails from './pages/AuthorDetails';
import AddAuthor from './pages/AddAuthor';
import EditAuthor from './pages/EditAuthor';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

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
        <Route path='/books'>
          <Route path=':bookId' element={<BookDetails />} />
          <Route
            path='add'
            element={
              <ProtectedRoute adminOnly={true}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path='edit/:bookId'
            element={
              <ProtectedRoute adminOnly={true}>
                <EditBook />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='/authors'>
          <Route path=':authorId' element={<AuthorDetails />} />
          <Route
            path='add'
            element={
              <ProtectedRoute adminOnly={true}>
                <AddAuthor />
              </ProtectedRoute>
            }
          />
          <Route
            path='edit/:authorId'
            element={
              <ProtectedRoute adminOnly={true}>
                <EditAuthor />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
