import React from 'react';
import { FaUser, FaBook } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signIn, signOut } from '../../../redux/actions';
import { AppState, User } from '../../../types';
import './_header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: AppState) => state.user);

  const logOutTesting = () => {
    dispatch(signOut());
  };

  return (
    <header className='header'>
      <nav className='nav'>
        <Link to='/' className='btn btn-logo'>
          <FaBook className='icon icon-book' />
          <h1 className='logo__text'>Local Library</h1>
        </Link>
        <button onClick={logOutTesting}>Logout</button>
        {user ? (
          <button className='btn user'>
            <FaUser className='icon icon-user' />
            <span className='user__text'>
              {user.firstName + ' ' + user.lastName}
            </span>
            <MdOutlineKeyboardArrowDown className='icon icon-arrow' />
          </button>
        ) : (
          <Link to='/login' className='btn btn-login'>
            <FaUser className='icon icon-user' />
            <span className='btn-login__text'>Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
