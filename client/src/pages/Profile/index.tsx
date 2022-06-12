import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PageWrapper from '../../components/layout/PageWrapper';
import {
  editUser,
  resetEditUser,
  clearEditUserError,
} from '../../redux/actions';
import { AppState, User } from '../../types';
import './_profile.scss';

const Profile = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { user, token } = useSelector((state: AppState) => state.user);
  const { loading, error, updated } = useSelector(
    (state: AppState) => state.editUser
  );

  const [editing, setEditing] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(user?.firstName);
  const [lastNameInput, setLastNameInput] = useState(user?.lastName);

  const toggleEditingHandler = () => {
    setEditing((prevState) => !prevState);
  };

  const navigateHomePageHandler = () => {
    navigate('/');
  };

  // Form handlers
  const firstNameInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setFirstNameInput(e.currentTarget.value);
  };
  const lastNameInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLastNameInput(e.currentTarget.value);
  };
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstNameInput && lastNameInput) {
      const inputData: Partial<User> = {
        firstName: firstNameInput,
        lastName: lastNameInput,
      };
      if (user) {
        dispatch(editUser(token, user?._id, inputData));
      }
    } else {
      alert('Please fill all inputs!');
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearEditUserError());
    }

    if (updated) {
      alert('Updated user successfully!');
      dispatch(resetEditUser());
    }
  }, [dispatch, navigate, error, updated]);

  return (
    <PageWrapper className={'profile'}>
      <div className='title'>
        <h1>Profile</h1>
        <div className='actions'>
          {!editing && (
            <button className='action' onClick={toggleEditingHandler}>
              Edit
            </button>
          )}
          <button className='action' onClick={navigateHomePageHandler}>
            Home
          </button>
        </div>
      </div>
      <div className='container'>
        {!editing ? (
          <>
            <div className='info info-email'>
              <span className='label'>Email:</span>
              <span> {user?.email}</span>
            </div>
            <div className='info info-name'>
              <div className='info-name__column info-name__column-left'>
                <span className='label'>First name:</span>
                <span> {user?.firstName}</span>
              </div>
              <div className='info-name__column info-name__column-right'>
                <span className='label'>Last name:</span>
                <span> {user?.lastName}</span>
              </div>
            </div>
          </>
        ) : (
          <form className='edit-form'>
            <div className='info info-email'>
              <span className='label'>Email:</span>
              <span> {user?.email}</span>
            </div>
            <div className='info info-name'>
              <div className='form-controller info-name__column info-name__column-left'>
                <label htmlFor='first-name' className='label'>
                  First name:
                </label>
                <input
                  id='first-name'
                  type='text'
                  onChange={firstNameInputChangeHandler}
                  value={firstNameInput}
                ></input>
              </div>
              <div className='form-controller info-name__column info-name__column-right'>
                <label htmlFor='last-name' className='label'>
                  Last name:
                </label>
                <input
                  id='last-name'
                  type='text'
                  onChange={lastNameInputChangeHandler}
                  value={lastNameInput}
                ></input>
              </div>
            </div>
            <div className='form-actions'>
              <button
                className='form-action form-action-save'
                type='submit'
                onClick={formSubmitHandler}
              >
                Save
              </button>
              <button
                className='form-action form-action-discard'
                type='button'
                onClick={toggleEditingHandler}
              >
                Discard
              </button>
            </div>
          </form>
        )}
      </div>
    </PageWrapper>
  );
};

export default Profile;
