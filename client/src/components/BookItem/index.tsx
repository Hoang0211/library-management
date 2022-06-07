import React from 'react';
import { RiBookFill } from 'react-icons/ri';

import { Book } from '../../types';
import './_bookItem.scss';

type BookItemProps = {
  book: Book;
  lastItem: boolean;
};

const BookItem = ({ book, lastItem }: BookItemProps) => {
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
        <p className='authors'>Authors: {book.authors.join(', ')}</p>
        <p className='status'>Status: Available</p>
      </div>
      <button className='btn btn-details'>More Details</button>
    </div>
  );
};

export default BookItem;
