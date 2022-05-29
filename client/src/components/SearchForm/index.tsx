import React from 'react';
import { IoSearch } from 'react-icons/io5';

import './_searchForm.scss';

type SearchFormProps = {
  currentDisplay: 'books' | 'authors';
};

const SearchForm = ({ currentDisplay }: SearchFormProps) => {
  return (
    <form className='search-form'>
      <input className='search-bar' type='text' placeholder='Find...'></input>
      {currentDisplay === 'books' ? (
        <select className='filter'>
          <option>Title</option>
          <option>Category</option>
          <option>ISBN</option>
        </select>
      ) : (
        <select className='filter'>
          <option>Name</option>
          <option>First Name</option>
          <option>Last Name</option>
        </select>
      )}
      <button className='btn btn-search' type='submit'>
        <IoSearch className='icon icon-search' />
      </button>
    </form>
  );
};

export default SearchForm;
