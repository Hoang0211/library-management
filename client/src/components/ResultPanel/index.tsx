import React, { useState, useEffect } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import axios, { AxiosResponse } from 'axios';

import BookItem from '../BookItem';
import { Book, ApiDataType, Status } from '../../types';
import './_resultPanel.scss';

type ResultPanelProps = {
  currentDisplay: 'books' | 'authors';
};

const books: Book[] = [
  {
    _id: 'id1',
    authors: ['Hoang', 'Viet'],
    status: Status.Available,
    isbn: '1000000000-x',
    title: 'Hello World',
    description:
      'This is the description for the first book called Hello World.',
    publisher: 'Nguyen Hoang',
    publishedDate: new Date(),
    category: 'article',
    numPage: 1,
  },
  {
    _id: 'id2',
    authors: ['Hoang', 'Quang'],
    status: Status.Available,
    isbn: '1000000000-x',
    title: 'Hello Mars',
    description:
      'This is the description for the second book called Hello Mars.',
    publisher: 'Nguyen Hoang',
    publishedDate: new Date(),
    category: 'article',
    numPage: 1,
  },
  {
    _id: 'id3',
    authors: ['Hoang', 'Anh'],
    status: Status.Available,
    isbn: '1000000000-x',
    title: 'Hello Moon',
    description:
      'This is the description for the third book called Hello Moon.',
    publisher: 'Nguyen Hoang',
    publishedDate: new Date(),
    category: 'article',
    numPage: 1,
  },
];

const ResultPanel = ({ currentDisplay }: ResultPanelProps) => {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const fetchBooks = async (): Promise<AxiosResponse<ApiDataType>> => {
  //     try {
  //       console.log('Hello');
  //       const books: AxiosResponse<ApiDataType> = await axios.get(
  //         'http://localhost:5000/api/v1/books'
  //       );
  //       console.log('Hello');

  //       console.log(books);
  //       return books;
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error();
  //     }
  //   };

  //   fetchBooks()
  //     .then(({ data: { books } }: Book[] | any) => setData(books))
  //     .then(() => console.log(data))
  //     .catch((err: Error) => console.log(err));
  // }, []);

  return (
    <div className='result-panel'>
      <div className='settings'>
        <span className='show-info'>Showing 1-20 results of 1000</span>
        <div className='setting setting-results'>
          <label htmlFor='results-number'>Results/page</label>
          <select name='results-number' id='results-number'>
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <div className='setting setting-sort'>
          <label>Sort</label>
          {currentDisplay === 'books' ? (
            <select>
              <option>Title (Asc)</option>
              <option>Title (Des)</option>
            </select>
          ) : (
            <select>
              <option>Name (Asc)</option>
              <option>Name (Des)</option>
            </select>
          )}
        </div>
        {currentDisplay === 'books' && (
          <div className='setting setting-available'>
            <label>Available</label>
            <input type='checkbox'></input>
          </div>
        )}
      </div>
      <div className='display'>
        {books.map((book) => {
          return (
            <BookItem
              key={book._id}
              book={book}
              lastItem={book === books[books.length - 1]}
            />
          );
        })}
      </div>
      <div className='pagination'>
        <button className='btn btn-first'>
          <FaAngleDoubleLeft className='icon icon-first' />
        </button>
        <button className='btn btn-back'>
          <RiArrowDropLeftLine className='icon icon-back' />
        </button>
        <button className='btn btn-page'>1</button>
        <button className='btn btn-page'>2</button>
        <button className='btn btn-page'>3</button>
        <button className='btn btn-page'>4</button>
        <button className='btn btn-page'>5</button>
        <button className='btn btn-next'>
          <RiArrowDropRightLine className='icon icon-next' />
        </button>
        <button className='btn btn-last'>
          <FaAngleDoubleRight className='icon icon-last' />
        </button>
      </div>
    </div>
  );
};

export default ResultPanel;
