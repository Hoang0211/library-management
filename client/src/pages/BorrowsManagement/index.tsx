import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PageWrapper from '../../components/layout/PageWrapper';
import BorrowItem from '../../components/BorrowItem';
import {
  getAllBorrows,
  clearGetAllBorrowsError,
  returnBook,
  clearReturnBookError,
  resetReturnBook,
} from '../../redux/actions';
import { AppState } from '../../types';
import './_borrowsManagement.scss';

const BorrowsManagement = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { token } = useSelector((state: AppState) => state.user);
  const {
    loading: borrowsLoading,
    error: borrowsError,
    borrows,
  } = useSelector((state: AppState) => state.getBorrows);
  const {
    loading: returnLoading,
    error: returnError,
    returned,
  } = useSelector((state: AppState) => state.returnBook);

  const navigateHomePageHandler = () => {
    navigate('/');
  };

  const navigateBorrowPageHandler = () => {
    navigate('/borrows/add');
  };

  const displayResults = () => {
    if (borrows.length === 0 || borrowsLoading) {
      return (
        <div className='borrow-item borrow-item-placeholder'>
          <span className='user'>User</span>
          <span className='book'>Book</span>
          <span className='borrow'>Borrow Date</span>
          <span className='due'>Due Date</span>
          <span className='return'>Return</span>
        </div>
      );
    }

    return borrows.map((borrow) => (
      <BorrowItem
        key={borrow._id}
        borrow={borrow}
        returnBookHandler={returnBookHandler}
        returnLoading={returnLoading}
      />
    ));
  };

  const returnBookHandler = (borrowId: string) => {
    dispatch(returnBook(token, borrowId));
  };

  useEffect(() => {
    dispatch(getAllBorrows(token));

    if (borrowsError) {
      alert(borrowsError);
      dispatch(clearGetAllBorrowsError());
      navigate('/');
    }

    if (returnError) {
      alert(returnError.message);
      dispatch(clearReturnBookError());
    }

    if (returned) {
      alert('Return book successfully!');
      dispatch(resetReturnBook());
    }
  }, [dispatch, navigate, token, borrowsError, returnError, returned]);

  return (
    <PageWrapper className={'borrows-management'}>
      <div className='title'>
        <h1>Borrows Management</h1>
        <div className='actions'>
          <button className='action' onClick={navigateBorrowPageHandler}>
            Borrow Book
          </button>
          <button className='action' onClick={navigateHomePageHandler}>
            Home
          </button>
        </div>
      </div>
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
    </PageWrapper>
  );
};

export default BorrowsManagement;
