import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { IoAdd } from 'react-icons/io5';

import BookItem from '../BookItem';
import AuthorItem from '../AuthorItem';
import {
  getAllAuthor,
  clearGetAllAuthorError,
  getAllBook,
  clearGetAllBookError,
} from '../../redux/actions';
import { Book, Status, AppState, Role } from '../../types';
import './_resultPanel.scss';

type ResultPanelProps = {
  currentDisplay: 'books' | 'authors';
};

const ResultPanel = ({ currentDisplay }: ResultPanelProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { user } = useSelector((state: AppState) => state.user);
  const {
    loading: booksLoading,
    error: booksError,
    books,
  } = useSelector((state: AppState) => state.books);
  const {
    loading: authorsLoading,
    error: authorsError,
    authors,
  } = useSelector((state: AppState) => state.authors);

  const displayAddBtn = () => {
    if (user && user.role === Role.Admin) {
      if (currentDisplay === 'books') {
        return (
          <button
            className='btn btn-add'
            onClick={() => navigate('/books/add')}
          >
            <IoAdd />
          </button>
        );
      } else {
        return (
          <button
            className='btn btn-add'
            onClick={() => navigate('/authors/add')}
          >
            <IoAdd />
          </button>
        );
      }
    }
  };

  const displayResults = () => {
    if (currentDisplay === 'books') {
      if (booksLoading) {
        return <p>Loading...</p>;
      } else {
        return books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            lastItem={book === books[books.length - 1]}
          />
        ));
      }
    } else {
      if (authorsLoading) {
        return <p>Loading...</p>;
      } else {
        return authors.map((author) => (
          <AuthorItem
            key={author._id}
            author={author}
            lastItem={author === authors[authors.length - 1]}
          />
        ));
      }
    }
  };

  useEffect(() => {
    if (currentDisplay === 'books') {
      if (booksError) {
        alert(booksError);
        dispatch(clearGetAllBookError());
      }

      dispatch(getAllBook());
    } else {
      if (authorsError) {
        alert(authorsError);
        dispatch(clearGetAllAuthorError());
      }

      dispatch(getAllAuthor());
    }
  }, [dispatch, currentDisplay, authorsError, booksError]);

  return (
    <div className='result-panel'>
      <div className='settings'>
        <span className='show-info'>Showing 1-20 results of 1000</span>
        <div className='setting setting-results'>
          <label htmlFor='results-number'>Results/page</label>
          <select name='results-number' id='results-number'>
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <div className='setting setting-sort'>
          <label>Sort</label>
          {currentDisplay === 'books' ? (
            <select>
              <option>Title (Asc)</option>
              <option>Title (Des)</option>
            </select>
          ) : (
            <select>
              <option>Name (Asc)</option>
              <option>Name (Des)</option>
            </select>
          )}
        </div>
        {currentDisplay === 'books' && (
          <div className='setting setting-available'>
            <label>Available</label>
            <input type='checkbox'></input>
          </div>
        )}
        {displayAddBtn()}
      </div>
      <div className='display'>{displayResults()}</div>
      <div className='pagination'>
        <button className='btn btn-first'>
          <FaAngleDoubleLeft className='icon icon-first' />
        </button>
        <button className='btn btn-back'>
          <RiArrowDropLeftLine className='icon icon-back' />
        </button>
        <button className='btn btn-page'>1</button>
        <button className='btn btn-page'>2</button>
        <button className='btn btn-page'>3</button>
        <button className='btn btn-page'>4</button>
        <button className='btn btn-page'>5</button>
        <button className='btn btn-next'>
          <RiArrowDropRightLine className='icon icon-next' />
        </button>
        <button className='btn btn-last'>
          <FaAngleDoubleRight className='icon icon-last' />
        </button>
      </div>
    </div>
  );
};

export default ResultPanel;
