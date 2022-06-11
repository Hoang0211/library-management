import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BorrowItem from '../../components/BorrowItem';
import { getAllBorrows, clearGetAllBorrowsError } from '../../redux/actions';
import { AppState } from '../../types';
import './_returnBook.scss';

const ReturnBook = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const {
    loading: borrowsLoading,
    error: borrowsError,
    borrows,
  } = useSelector((state: AppState) => state.getBorrows);

  const displayResults = () => {
    if (borrowsLoading) {
      return <p>Loading...</p>;
    } else {
      return borrows.map((borrow) => (
        <BorrowItem key={borrow._id} borrow={borrow} />
      ));
    }
  };

  useEffect(() => {
    if (borrowsError) {
      alert(borrowsError);
      dispatch(clearGetAllBorrowsError());
    }

    dispatch(getAllBorrows());
  }, [dispatch, borrowsError]);

  return (
    <main className='page'>
      <h1 className='title'>Borrows Management</h1>
      <div className='container'>
        <div className='headers'>
          <span className='header header-user'>User</span>
          <span className='header header-book'>Book</span>
          <span className='header header-borrow'>Borrow Date</span>
          <span className='header header-due'>DueDate</span>
          <span className='header header-return'></span>
        </div>
        <div className='results'>{displayResults()}</div>
      </div>
    </main>
  );
};

export default ReturnBook;
