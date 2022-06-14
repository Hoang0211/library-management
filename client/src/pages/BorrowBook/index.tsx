import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PageWrapper from '../../components/layout/PageWrapper';
import AllBookModal from '../../components/AllBookModal';
import { borrow, resetBorrow, clearBorrowError } from '../../redux/actions';
import { AppState, Book, BorrowRequest } from '../../types';
import { dateFormat } from '../../utils/dateFormat';
import './_borrowBook.scss';

const BorrowBook = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { token } = useSelector((state: AppState) => state.user);
  const { loading, error, borrowed } = useSelector(
    (state: AppState) => state.borrow
  );

  // Form inputs state
  const [emailInput, setEmailInput] = useState('');
  const [booksInput, setBooksInput] = useState<Book[]>([]);

  // List of book state
  const [showBookList, setShowBookList] = useState(false);

  // Get date
  const borrowDate = new Date(Date.now());
  const dueDate = new Date(Date.now() + 12096e5);

  // Form inputs onChange handler
  const emailInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailInput(e.currentTarget.value);
  };
  const toggleListOfBooksHandler = () => {
    setShowBookList((prevState) => !prevState);
  };
  const addBookInputHandler = (book: Book) => {
    setBooksInput([...booksInput, book]);
  };
  const removeBookInputHandler = (book: Book) => {
    setBooksInput(booksInput.filter((thisBook) => thisBook._id !== book._id));
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailInput) {
      alert('Please enter user email!');
      return;
    }

    if (booksInput.length < 1) {
      alert('Please select atleast 1 book!');
      return;
    }

    const formData: BorrowRequest = {
      userEmail: emailInput,
      bookIds: booksInput.map((book) => book._id),
      borrowDate: borrowDate,
      dueDate: dueDate,
    };

    dispatch(borrow(token, formData));
  };

  const discardHandler = () => {
    navigate('/borrows');
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearBorrowError());
    }

    if (borrowed) {
      alert('Borrow successfully!');
      navigate('/borrows');
      dispatch(resetBorrow());
    }
  }, [dispatch, navigate, error, borrowed]);

  return (
    <PageWrapper className='borrow-book'>
      <div className='title'>
        <h1>New Author</h1>
        <div className='actions'>
          <button className='action' onClick={discardHandler}>
            Home
          </button>
        </div>
      </div>
      <div className='container container-add'>
        <form onSubmit={formSubmitHandler}>
          <div className='input-controller'>
            <label className='label label-email' htmlFor='email'>
              Email:
            </label>
            <input
              id='email'
              type='text'
              placeholder='Enter user email...'
              onChange={emailInputChangeHandler}
              value={emailInput}
            ></input>
          </div>
          <div className='input-controller'>
            <label className='label label-books' htmlFor='books'>
              Borrow books:{' '}
            </label>
            <ul className='borrow-items'>
              {booksInput.map((book) => (
                <li className='borrow-item' key={book._id}>
                  {book.title} ({book.isbn})
                </li>
              ))}
            </ul>
            <button
              id='books'
              className='select select-books'
              type='button'
              onClick={toggleListOfBooksHandler}
            >
              Show list of books
            </button>
            {showBookList && (
              <AllBookModal
                booksInput={booksInput}
                addBookInputHandler={addBookInputHandler}
                removeBookInputHandler={removeBookInputHandler}
                onCloseHandler={toggleListOfBooksHandler}
              />
            )}
          </div>
          <p className='label label-due'>
            Due date: {dateFormat(new Date(Date.now() + 12096e5))}
          </p>
          <div className='form-actions'>
            <button
              className='form-action form-action-add'
              type='submit'
              onClick={formSubmitHandler}
              disabled={loading}
            >
              Borrow
            </button>
            <button
              className='form-action form-action-discard'
              type='button'
              onClick={discardHandler}
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default BorrowBook;
