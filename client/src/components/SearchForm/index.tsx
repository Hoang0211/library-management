import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';

import { Category, Status } from '../../types';
import './_searchForm.scss';

type SearchFormProps = {
  currentDisplay: 'books' | 'authors';
  keywordInput: string;
  selectedArticle: boolean;
  selectedBook: boolean;
  selectedJournal: boolean;
  selectedThesis: boolean;
  selectedOther: boolean;
  selectedAvailable: boolean;
  selectedBorrowed: boolean;
  keywordInputChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  categoriesCheckboxHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  statusesCheckboxHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  searchBookSubmitHandler: (e: React.FormEvent) => void;
};

const SearchForm = ({
  currentDisplay,
  keywordInput,
  selectedArticle,
  selectedBook,
  selectedJournal,
  selectedThesis,
  selectedOther,
  selectedAvailable,
  selectedBorrowed,
  keywordInputChangeHandler,
  categoriesCheckboxHandler,
  statusesCheckboxHandler,
  searchBookSubmitHandler,
}: SearchFormProps) => {
  const [showCategory, setShowCategory] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const toggleCategorysHandler = () => {
    setShowCategory((prevState) => !prevState);
  };
  const toggleStatusHandler = () => {
    setShowStatus((prevState) => !prevState);
  };

  return (
    <form className='form form-search' onSubmit={searchBookSubmitHandler}>
      <h2 className='form-search__title'>Search</h2>
      <div className='form-search__controller form-search__controller-search'>
        <input
          className='form-search__input'
          type='text'
          placeholder={
            currentDisplay === 'books'
              ? 'Search for title or ISBN...'
              : 'Search for name...'
          }
          onChange={keywordInputChangeHandler}
          value={keywordInput}
        ></input>
        <button className='form-search__search' type='submit'>
          <IoSearch className='icon icon-search' />
        </button>
      </div>
      {currentDisplay === 'books' && (
        <>
          {' '}
          <div className='form-search__controller form-search__controller-category'>
            <button
              className='form-search__label'
              type='button'
              onClick={toggleCategorysHandler}
            >
              Category
              {showCategory ? (
                <MdOutlineArrowDropDown />
              ) : (
                <MdOutlineArrowDropUp />
              )}
            </button>
            {showCategory && (
              <ul>
                <li>
                  <label htmlFor='article'>Article</label>
                  <input
                    id='article'
                    type='checkbox'
                    onChange={categoriesCheckboxHandler}
                    value={Category.Article}
                    checked={selectedArticle}
                  />
                </li>
                <li>
                  <label htmlFor='book'>Book</label>
                  <input
                    id='book'
                    type='checkbox'
                    onChange={categoriesCheckboxHandler}
                    value={Category.Book}
                    checked={selectedBook}
                  />
                </li>
                <li>
                  <label htmlFor='journal'>Journal</label>
                  <input
                    id='journal'
                    type='checkbox'
                    onChange={categoriesCheckboxHandler}
                    value={Category.Journal}
                    checked={selectedJournal}
                  />
                </li>
                <li>
                  <label htmlFor='thesis'>Thesis</label>
                  <input
                    id='thesis'
                    type='checkbox'
                    onChange={categoriesCheckboxHandler}
                    value={Category.Thesis}
                    checked={selectedThesis}
                  />
                </li>
                <li>
                  <label htmlFor='other'>Other</label>
                  <input
                    id='other'
                    type='checkbox'
                    onChange={categoriesCheckboxHandler}
                    value={Category.Other}
                    checked={selectedOther}
                  />
                </li>
              </ul>
            )}
          </div>
          <div className='form-search__controller form-search__controller-status'>
            <button
              className='form-search__label'
              type='button'
              onClick={toggleStatusHandler}
            >
              Status
              {showStatus ? (
                <MdOutlineArrowDropDown />
              ) : (
                <MdOutlineArrowDropUp />
              )}
            </button>
            {showStatus && (
              <ul>
                <li>
                  <label htmlFor='available'>Available</label>
                  <input
                    id='available'
                    type='checkbox'
                    onChange={statusesCheckboxHandler}
                    value={Status.Available}
                    checked={selectedAvailable}
                  />
                </li>
                <li>
                  <label htmlFor='borrowed'>Borrowed</label>
                  <input
                    id='borrowed'
                    type='checkbox'
                    onChange={statusesCheckboxHandler}
                    value={Status.Borrowed}
                    checked={selectedBorrowed}
                  />
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default SearchForm;
