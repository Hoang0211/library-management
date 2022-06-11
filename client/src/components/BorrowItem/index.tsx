import React from 'react';

import { Borrow } from '../../types';
import { dateFormat } from '../../utils/dateFormat';
import './_borrowItem.scss';

type BorrowItemProps = {
  borrow: Borrow;
};

const BorrowItem = ({ borrow }: BorrowItemProps) => {
  return (
    <div className='borrow-item'>
      <span className='user'>{borrow.user.email}</span>
      <span className='book'>{borrow.book.isbn}</span>
      <span className='borrow'>{dateFormat(new Date(borrow.borrowDate))}</span>
      <span className='due'>{dateFormat(new Date(borrow.dueDate))}</span>
      <span className='return'>Return</span>
    </div>
  );
};

export default BorrowItem;
