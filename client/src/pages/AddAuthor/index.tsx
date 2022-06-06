import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  addAuthor,
  resetAddAuthor,
  clearAuthorError,
} from '../../redux/actions';
import { Author, AppState } from '../../types';
import './_addAuthor.scss';

const AddAuthor = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { token } = useSelector((state: AppState) => state.user);
  const { loading, error, author } = useSelector(
    (state: AppState) => state.addAuthor
  );

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [biographyInput, setBiographyInput] = useState('');

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
      dispatch(addAuthor(token, inputData));
    } else {
      alert('Please fill all inputs!');
    }
  };

  const discardHandler = (): void => {
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearAuthorError());
    }

    if (author) {
      alert(
        `Successfully created author ${author.firstName} ${author.lastName}!`
      );
      navigate('/');
      dispatch(resetAddAuthor());
    }
  }, [dispatch, navigate, error, author]);

  return (
    <main className='add-author'>
      <form className='container' onSubmit={formSubmitHandler}>
        <h2 className='title'>New Author</h2>
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

export default AddAuthor;
