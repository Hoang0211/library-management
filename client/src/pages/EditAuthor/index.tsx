import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  getAuthorDetails,
  editAuthor,
  resetEditAuthor,
  clearEditAuthorError,
} from '../../redux/actions';
import { Author, AppState } from '../../types';
import './_editAuthor.scss';

const EditAuthor = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { token } = useSelector((state: AppState) => state.user);
  const { author } = useSelector((state: AppState) => state.authorDetails);
  const { loading, error, updated } = useSelector(
    (state: AppState) => state.editAuthor
  );

  const { authorId } = useParams<{ authorId?: string }>();

  const [firstNameInput, setFirstNameInput] = useState(author?.firstName);
  const [lastNameInput, setLastNameInput] = useState(author?.lastName);
  const [biographyInput, setBiographyInput] = useState(author?.biography);

  const firstNameInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setFirstNameInput(e.currentTarget.value);
  };
  const lastNameInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setLastNameInput(e.currentTarget.value);
  };
  const biographyInputChangeHandler = (
    e: React.FormEvent<HTMLTextAreaElement>
  ): void => {
    setBiographyInput(e.currentTarget.value);
  };
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstNameInput && lastNameInput && biographyInput) {
      const inputData: Partial<Author> = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        biography: biographyInput,
      };
      if (authorId) {
        dispatch(editAuthor(token, authorId, inputData));
      }
    } else {
      alert('Please fill all inputs!');
    }
  };
  const discardHandler = (): void => {
    navigate(`/authors/${authorId}`);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearEditAuthorError());
    }

    if (updated) {
      alert('Updated author successfully!');
      if (authorId) {
        dispatch(getAuthorDetails(authorId));
      }
      navigate(`/authors/${authorId}`);
      dispatch(resetEditAuthor());
    }
  }, [dispatch, navigate, authorId, error, updated]);

  return (
    <main className='edit-author'>
      <form className='container' onSubmit={formSubmitHandler}>
        <h2 className='title'>Edit Author</h2>
        <div className='input-controller'>
          <label htmlFor='firstName'>First name</label>
          <input
            id='firstName'
            type='text'
            placeholder='Enter first name...'
            onChange={firstNameInputChangeHandler}
            value={firstNameInput}
          ></input>
        </div>
        <div className='input-controller'>
          <label htmlFor='lastName'>Last name</label>
          <input
            id='lastName'
            type='text'
            placeholder='Enter last name...'
            onChange={lastNameInputChangeHandler}
            value={lastNameInput}
          ></input>
        </div>
        <div className='input-controller'>
          <label htmlFor='biography'>Biography</label>
          <textarea
            id='biography'
            placeholder='Enter biography...'
            onChange={biographyInputChangeHandler}
            value={biographyInput}
          ></textarea>
        </div>
        <div className='btns'>
          <button
            className='btn btn-save'
            type='submit'
            onClick={formSubmitHandler}
            disabled={loading ? true : false}
          >
            Save
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

export default EditAuthor;
