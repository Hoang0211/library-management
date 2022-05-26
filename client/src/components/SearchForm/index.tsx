import React from 'react';
import { IoSearch } from 'react-icons/io5';

import './_searchForm.scss';

const SearchForm = () => {
  return (
    <form className='search-form'>
      <input className='search-bar' type='text' placeholder='Find...'></input>
      <select className='filter'>
        <option>Title</option>
        <option>Author</option>
        <option>Category</option>
        <option>ISBN</option>
      </select>
      <button className='btn btn-search' type='submit'>
        <IoSearch className='icon icon-search' />
      </button>
    </form>
  );
};

export default SearchForm;
