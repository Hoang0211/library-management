import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { IoAdd } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BookItem from '../BookItem';
import AuthorItem from '../AuthorItem';
import { Book, Status, AppState, Role } from '../../types';
import './_resultPanel.scss';

type ResultPanelProps = {
  currentDisplay: 'books' | 'authors';
};

const books: Book[] = [
  {
    _id: 'id1',
    authors: ['Hoang', 'Viet'],
    status: Status.Available,
    isbn: '1000000000-x',
    title: 'Hello World',
    description:
      'This is the description for the first book called Hello World.',
    publisher: 'Nguyen Hoang',
    publishedDate: new Date(),
    category: 'article',
    numPage: 1,
  },
  {
    _id: 'id2',
    authors: ['Hoang', 'Quang'],
    status: Status.Available,
    isbn: '1000000000-x',
    title: 'Hello Mars',
    description:
      'This is the description for the second book called Hello Mars.',
    publisher: 'Nguyen Hoang',
    publishedDate: new Date(),
    category: 'article',
    numPage: 1,
  },
  {
    _id: 'id3',
    authors: ['Hoang', 'Anh'],
    status: Status.Available,
    isbn: '1000000000-x',
    title: 'Hello Moon',
    description:
      'This is the description for the third book called Hello Moon.',
    publisher: 'Nguyen Hoang',
    publishedDate: new Date(),
    category: 'article',
    numPage: 1,
  },
];

const ResultPanel = ({ currentDisplay }: ResultPanelProps) => {
  const { user } = useSelector((state: AppState) => state.user);
  const { loading, error, authors } = useSelector(
    (state: AppState) => state.authors
  );

  const displayAddBtn = () => {
    if (user && user.role === Role.Admin) {
      if (currentDisplay === 'books') {
        return (
          <Link to='/add-book' className='add'>
            <IoAdd />
          </Link>
        );
      } else {
        return (
          <Link to='/authors/add' className='add'>
            <IoAdd />
          </Link>
        );
      }
    }
  };

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
      <div className='display'>
        {loading && 'Loading...'}
        {error && `${error.message}`}
        {!loading && !error && currentDisplay === 'books'
          ? books.map((book) => (
              <BookItem
                key={book._id}
                book={book}
                lastItem={book === books[books.length - 1]}
              />
            ))
          : authors.map((author) => (
              <AuthorItem
                key={author._id}
                author={author}
                lastItem={author === authors[authors.length - 1]}
              />
            ))}
      </div>
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
