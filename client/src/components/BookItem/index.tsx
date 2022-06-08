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

  const navigateToAuthorDetailsHandler = () => {
    navigate(`/books/${book._id}`);
    dispatch(getBookDetails(book._id));
  };

  return (
    <div className={`book-item ${lastItem && 'book-item-last'}`}>
      <div className='info'>
        <p className='title'>
          {book.title} ({new Date(book.publishedDate).getFullYear()})
        </p>
        <div className='category'>
          <RiBookFill className='icon category__icon' />
          <span className='category__text'>{book.category}</span>
        </div>
        <p className='authors'>
          Authors:{' '}
          {book.authors
            .map((author) => author.firstName + ' ' + author.lastName)
            .join(', ')}
        </p>
        <p className='status'>Status: Available</p>
      </div>
      <button
        className='btn btn-details'
        onClick={navigateToAuthorDetailsHandler}
      >
        More Details
      </button>
    </div>
  );
};

export default BookItem;
