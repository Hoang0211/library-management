import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiBookFill } from 'react-icons/ri';

import { getBookDetails } from '../../redux/actions';
import { Book } from '../../types';
import './_bookItem.scss';

type BookItemProps = {
  book: Book;
  lastItem: boolean;
};

const BookItem = ({ book, lastItem }: BookItemProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const navigateToBookDetailsHandler = () => {
    navigate(`/books/${book._id}`);
    dispatch(getBookDetails(book._id));
  };

  return (
    <div className={`book-item ${lastItem && 'book-item-last'}`}>
      <div className='book-item__info'>
        <p className='book-item__title'>
          {book.title} ({new Date(book.publishedDate).getFullYear()})
        </p>
        <div className='book-item__category'>
          <RiBookFill className='icon category__icon' />
          <span className='category__text'>{book.category}</span>
        </div>
        <p className='book-item__authors'>
          Authors:{' '}
          {book.authors
            .map((author) => author.firstName + ' ' + author.lastName)
            .join(', ')}
        </p>
        <p className='book-item__status'>
          Status: {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
        </p>
      </div>
      <button
        className='book-item__details'
        onClick={navigateToBookDetailsHandler}
      >
        More Details
      </button>
    </div>
  );
};

export default BookItem;
