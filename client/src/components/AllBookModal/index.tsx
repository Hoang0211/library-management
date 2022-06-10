import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../ui/Modal';
import { getAllBook, clearGetAllBookError } from '../../redux/actions';
import { AppState, Book, Status } from '../../types';
import './_allBookModal.scss';

type BookRowProps = {
  book: Book;
  booksInput: Book[];
  addBookInputHandler: (book: Book) => void;
  removeBookInputHandler: (book: Book) => void;
};

type AllBookModalProps = {
  booksInput: Book[];
  addBookInputHandler: (book: Book) => void;
  removeBookInputHandler: (book: Book) => void;
  onCloseHandler: () => void;
};

const BookRow = ({
  book,
  booksInput,
  addBookInputHandler,
  removeBookInputHandler,
}: BookRowProps) => {
  const [added, setAdded] = useState(
    booksInput.map((bookInput) => bookInput._id).includes(book._id)
  );

  const addBookHandler = (addedBook: Book) => {
    addBookInputHandler(addedBook);
    setAdded((prevState) => !prevState);
  };

  const removeBookHandler = (removedBook: Book) => {
    removeBookInputHandler(removedBook);
    setAdded((prevState) => !prevState);
  };

  return (
    <div className='books-modal__row'>
      <div className='books-modal__info'>
        {book.title} ({book.isbn})
      </div>

      {added ? (
        <button
          className='btn books-modal__add'
          type='button'
          onClick={() => removeBookHandler(book)}
        >
          Remove
        </button>
      ) : (
        <button
          className='btn books-modal__remove'
          type='button'
          onClick={() => addBookHandler(book)}
        >
          Add
        </button>
      )}
    </div>
  );
};

const AllBookModal = ({
  booksInput,
  addBookInputHandler,
  removeBookInputHandler,
  onCloseHandler,
}: AllBookModalProps) => {
  const dispatch = useDispatch<any>();

  const { loading, error, books } = useSelector(
    (state: AppState) => state.books
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearGetAllBookError());
    }
    dispatch(getAllBook());
  }, [dispatch, error]);

  return (
    <Modal onClose={onCloseHandler}>
      <>
        <p className='books-modal__input'>
          Borrow books: {booksInput.map((book) => book.title).join(', ')}
        </p>

        <div className='books-modal__rows'>
          <p className='books-modal__rows-title'>List of book:</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            books
              .filter((book) => book.status === Status.Available)
              .map((book) => (
                <BookRow
                  key={book._id}
                  booksInput={booksInput}
                  book={book}
                  addBookInputHandler={addBookInputHandler}
                  removeBookInputHandler={removeBookInputHandler}
                />
              ))
          )}
        </div>
      </>
    </Modal>
  );
};

export default AllBookModal;
