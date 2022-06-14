import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PageWrapper from '../../components/layout/PageWrapper';
import {
  addAuthor,
  resetAddAuthor,
  clearAddAuthorError,
} from '../../redux/actions';
import { Author, AppState } from '../../types';
import './_addAuthor.scss';

const AddAuthor = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { token } = useSelector((state: AppState) => state.user);
  const { loading, error, added } = useSelector(
    (state: AppState) => state.addAuthor
  );

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [biographyInput, setBiographyInput] = useState('');

  const firstNameInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setFirstNameInput(e.currentTarget.value);
  };
  const lastNameInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLastNameInput(e.currentTarget.value);
  };
  const biographyInputChangeHandler = (
    e: React.FormEvent<HTMLTextAreaElement>
  ) => {
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

  const discardHandler = () => {
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearAddAuthorError());
    }

    if (added) {
      alert('Created author successfully!');
      navigate('/');
      dispatch(resetAddAuthor());
    }
  }, [dispatch, navigate, error, added]);

  return (
    <PageWrapper className='add-author'>
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
          <div className='form-actions'>
            <button
              className='form-action form-action-add'
              type='submit'
              onClick={formSubmitHandler}
              disabled={loading}
            >
              Add
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

export default AddAuthor;
