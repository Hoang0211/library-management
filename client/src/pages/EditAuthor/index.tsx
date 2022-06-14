import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import PageWrapper from '../../components/layout/PageWrapper';
import {
  getAuthorDetails,
  editAuthor,
  resetEditAuthor,
  clearEditAuthorError,
} from '../../redux/actions';
import { AppState, Author } from '../../types';
import './_editAuthor.scss';

const EditAuthor = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { authorId } = useParams<{ authorId?: string }>();

  const { token } = useSelector((state: AppState) => state.user);
  const { author } = useSelector((state: AppState) => state.getAuthorDetails);
  const { loading, error, updated } = useSelector(
    (state: AppState) => state.editAuthor
  );

  const [firstNameInput, setFirstNameInput] = useState(author?.firstName);
  const [lastNameInput, setLastNameInput] = useState(author?.lastName);
  const [biographyInput, setBiographyInput] = useState(author?.biography);

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
      if (authorId) {
        dispatch(editAuthor(token, authorId, inputData));
      }
    } else {
      alert('Please fill all inputs!');
    }
  };

  const discardHandler = () => {
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
    <PageWrapper className='edit-author'>
      <div className='title'>
        <h1>Edit Author</h1>
        <div className='actions'>
          <button
            className='action'
            onClick={formSubmitHandler}
            disabled={loading}
          >
            Save
          </button>
          <button className='action' onClick={discardHandler}>
            Discard
          </button>
        </div>
      </div>
      <div className='container container-edit'>
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
        </form>
      </div>
    </PageWrapper>
  );
};

export default EditAuthor;
