import React, { useState } from 'react';

import { Category } from '../../types';
import './_addBook.scss';

const AddBook = () => {
  return (
    <main className='add-book'>
      <form className='container'>
        <h2 className='title'>New Book</h2>
        <div className='input-controller'>
          <label htmlFor='isbn'>ISBN:</label>
          <input id='isbn' type='text' placeholder='Enter ISBN...'></input>
        </div>
        <div className='input-controller'>
          <label htmlFor='book-title'>Title:</label>
          <input
            id='book-title'
            type='text'
            placeholder='Enter title...'
          ></input>
        </div>
        <div className='input-controller'>
          <label htmlFor='description'>Description:</label>
          <input id='description' placeholder='Enter description...'></input>
        </div>
        <div className='input-controller'>
          <label htmlFor='authors'>Authors:</label>
          <select id='category' className='authors-select'>
            <option>No info</option>
            <option>Nguyen Hoang</option>
          </select>
        </div>
        <div className='input-controller'>
          <label htmlFor='publisher'>Publisher:</label>
          <input
            id='publisher'
            type='text'
            placeholder='Enter publisher...'
          ></input>
        </div>
        <div className='input-controller'>
          <label htmlFor='published-date'>Published date:</label>
          <input
            id='published-date'
            type='text'
            placeholder='Enter published date...'
          ></input>
        </div>
        <div className='input-controller'>
          <label htmlFor='category'>Category:</label>
          <select id='category' className='category-select'>
            <option>Article</option>
            <option>Book</option>
            <option>Journal</option>
            <option>Thesis</option>
            <option>Other</option>
          </select>
        </div>
        <div className='input-controller'>
          <label htmlFor='page-num'>Number of pages:</label>
          <input
            id='page-num'
            type='text'
            placeholder='Enter number of pages...'
          ></input>
        </div>
        <div className='btns'>
          <button className='btn btn-save' type='submit'>
            Add
          </button>
          <button className='btn btn-discard' type='button'>
            Discard
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddBook;
