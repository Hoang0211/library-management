import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../ui/Modal';
import { getAllAuthor, clearGetAllAuthorError } from '../../redux/actions';
import { AppState, Author } from '../../types';
import './_allAuthorModal.scss';

type AuthorRowProps = {
  author: Author;
  authorsInput: Author[];
  addAuthorInputHandler: (author: Author) => void;
  removeAuthorInputHandler: (author: Author) => void;
};

type AllAuthorModalProps = {
  authorsInput: Author[];
  addAuthorInputHandler: (author: Author) => void;
  removeAuthorInputHandler: (author: Author) => void;
  onCloseHandler: () => void;
};

const AuthorRow = ({
  author,
  authorsInput,
  addAuthorInputHandler,
  removeAuthorInputHandler,
}: AuthorRowProps) => {
  const [added, setAdded] = useState(
    authorsInput.map((authorInput) => authorInput._id).includes(author._id)
  );

  const addAuthorHandler = (addedAuthor: Author) => {
    addAuthorInputHandler(addedAuthor);
    setAdded((prevState) => !prevState);
  };

  const removeAuthorHandler = (removedAuthor: Author) => {
    removeAuthorInputHandler(removedAuthor);
    setAdded((prevState) => !prevState);
  };

  return (
    <div className='authors-modal__row'>
      <span className='name'>
        {author.firstName} {author.lastName}
      </span>
      {added ? (
        <button
          className='btn btn-add'
          type='button'
          onClick={() => removeAuthorHandler(author)}
        >
          Remove
        </button>
      ) : (
        <button
          className='btn btn-remove'
          type='button'
          onClick={() => addAuthorHandler(author)}
        >
          Add
        </button>
      )}
    </div>
  );
};

const AllAuthorModal = ({
  authorsInput,
  addAuthorInputHandler,
  removeAuthorInputHandler,
  onCloseHandler,
}: AllAuthorModalProps) => {
  const dispatch = useDispatch<any>();

  const { loading, error, authors } = useSelector(
    (state: AppState) => state.authors
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearGetAllAuthorError());
    }
    dispatch(getAllAuthor());
  }, [dispatch, error]);

  return (
    <Modal onClose={onCloseHandler}>
      <>
        <p className='authors-modal__input'>
          Authors:{' '}
          {authorsInput
            .map((author) => author.firstName + ' ' + author.lastName)
            .join(', ')}
        </p>

        <div className='authors-modal__rows'>
          <p className='authors-modal__rows-title'>List of author:</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            authors.map((author) => (
              <AuthorRow
                key={author._id}
                authorsInput={authorsInput}
                author={author}
                addAuthorInputHandler={addAuthorInputHandler}
                removeAuthorInputHandler={removeAuthorInputHandler}
              />
            ))
          )}
        </div>
      </>
    </Modal>
  );
};

export default AllAuthorModal;
