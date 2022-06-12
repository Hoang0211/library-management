import React from 'react';

import { Borrow } from '../../types';
import { dateFormat } from '../../utils/dateFormat';
import './_borrowItem.scss';

type BorrowItemProps = {
  borrow: Borrow;
  returnBookHandler: (borrowId: string) => void;
  returnLoading: boolean;
};

const BorrowItem = ({
  borrow,
  returnBookHandler,
  returnLoading,
}: BorrowItemProps) => {
  return (
    <div className='borrow-item'>
      <span className='user'>{borrow.user.email}</span>
      <span className='book'>{borrow.book.isbn}</span>
      <span className='borrow'>{dateFormat(new Date(borrow.borrowDate))}</span>
      <span className='due'>{dateFormat(new Date(borrow.dueDate))}</span>
      <span className='return'>
        <button
          onClick={() => returnBookHandler(borrow._id)}
          disabled={returnLoading}
        >
          Return
        </button>
      </span>
    </div>
  );
};

export default BorrowItem;
