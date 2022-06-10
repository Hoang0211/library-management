import React, { useState } from 'react';
import { FaUser, FaBook } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '../../../redux/actions';
import { AppState, Role } from '../../../types';
import './_header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.user);

  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
  };

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <header className='header'>
      <nav className='nav'>
        <Link to='/' className='logo'>
          <FaBook className='icon logo__icon' />
          <h1 className='logo__text'>Local Library</h1>
        </Link>
        {user ? (
          <div className='user' onClick={toggleOptions}>
            <FaUser className='icon user__icon user__icon-user' />
            <span className='user__text'>
              {user.firstName + ' ' + user.lastName}
            </span>
            <MdOutlineKeyboardArrowDown className='icon user__icon user__icon-arrow' />
            <div
              className={`user__options ${showOptions && `user__options-show`}`}
            >
              <Link to='/profile' className='user__option'>
                Profile
              </Link>

              {user.role === Role.Admin && (
                <>
                  <Link to='/borrow' className='user__option'>
                    Borrow
                  </Link>
                  <Link to='/return' className='user__option'>
                    Return
                  </Link>
                </>
              )}
              <Link
                to='/'
                className='user__option user__option-last'
                onClick={logout}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <Link to='/login' className='login-btn'>
            <FaUser className='icon login-btn__icon' />
            <span className='login-btn__text'>Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
