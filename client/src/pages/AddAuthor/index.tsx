import React from 'react';
import { useNavigate } from 'react-router-dom';

import './_addAuthor.scss';

const AddAuthor = () => {
  const navigate = useNavigate();

  const add = () => {
    navigate('/');
  };

  const discard = () => {
    navigate('/');
  };

  return (
    <main className='add-author'>
      <form className='container'>
        <h2 className='title'>New Author</h2>
        <div className='input-controller'>
          <label>First name</label>
          <input type='text' placeholder='Enter first name...'></input>
        </div>
        <div className='input-controller'>
          <label>Last name</label>
          <input type='text' placeholder='Enter last name...'></input>
        </div>
        <div className='input-controller'>
          <label>Biography</label>
          <textarea placeholder='Enter biography...'></textarea>
        </div>
        <div className='btns'>
          <button className='btn btn-save' type='submit' onClick={add}>
            Add
          </button>
          <button className='btn btn-discard' onClick={discard}>
            Discard
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddAuthor;
