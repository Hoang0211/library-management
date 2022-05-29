import React from 'react';
import { FaUser, FaBook } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import './_header.scss';

const Header = () => {
  return (
    <header className='header'>
      <nav className='nav'>
        <button className='btn logo'>
          <FaBook className='icon icon-book' />
          <span className='logo__text'>Local Library</span>
        </button>
        {/* <button className='btn user'>
          <FaUser className='icon icon-user' />
          <span className='user__text'>Hoang Nguyen</span>
          <MdOutlineKeyboardArrowDown className='icon icon-arrow' />
        </button> */}
        <button className='btn btn-login'>
          <FaUser className='icon icon-user' />
          <span className='btn-login__text'>Login</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
