import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AllBookModal from '../../components/AllBookModal';
import { AppState, Category, Book, Author } from '../../types';
import { dateFormat } from '../../utils/dateFormat';
import './_loan.scss';

const Loan = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { token } = useSelector((state: AppState) => state.user);

  // Form inputs state
  const [emailInput, setEmailInput] = useState('');
  const [booksInput, setBooksInput] = useState<Book[]>([]);

  // List of book state
  const [showBookList, setShowBookList] = useState(false);

  // Form inputs onChange handler
  const emailInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setEmailInput(e.currentTarget.value);
  };
  const toggleListOfBooksHandler = (): void => {
    setShowBookList((prevState) => !prevState);
  };
  const addBookInputHandler = (book: Book): void => {
    setBooksInput([...booksInput, book]);
  };
  const removeBookInputHandler = (book: Book): void => {
    setBooksInput(booksInput.filter((thisBook) => thisBook._id !== book._id));
  };

  const formSubmitHandler = (): void => {};

  const discardHandler = (): void => {
    navigate('/');
  };

  return (
    <main className='loan'>
      <form className='container' onSubmit={formSubmitHandler}>
        <h2 className='title'>Loan</h2>
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
            Loan books:{' '}
          </label>
          <ul className='loan-items'>
            {booksInput.map((book) => (
              <li className='loan-item' key={book._id}>
                {book.title} ({book.isbn})
              </li>
            ))}
          </ul>
          <button
            id='books'
            className='books-select'
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
        <div className='btns'>
          <button
            className='btn btn-save'
            type='submit'
            onClick={formSubmitHandler}
            // disabled={loading ? true : false}
          >
            Add
          </button>
          <button
            className='btn btn-discard'
            type='button'
            onClick={discardHandler}
          >
            Discard
          </button>
        </div>
      </form>
    </main>
  );
};

export default Loan;
