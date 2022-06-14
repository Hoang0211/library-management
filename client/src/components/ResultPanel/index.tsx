import React from 'react';
import { useSelector } from 'react-redux';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

import BookItem from '../BookItem';
import AuthorItem from '../AuthorItem';
import { AppState } from '../../types';
import './_resultPanel.scss';

type ResultPanelProps = {
  currentDisplay: 'books' | 'authors';
  currentPage: number;
  limit: number;
  sort: string;
  limitChangeHandler: (e: React.FormEvent<HTMLSelectElement>) => void;
  sortChangeHandler: (e: React.FormEvent<HTMLSelectElement>) => void;
  changePageByArrowHandler: (
    action: 'first' | 'previous' | 'next' | 'last'
  ) => void;
  changePageByNumHandler: (pageNum: number) => void;
};

const ResultPanel = ({
  currentDisplay,
  currentPage,
  limit,
  sort,
  limitChangeHandler,
  sortChangeHandler,
  changePageByArrowHandler,
  changePageByNumHandler,
}: ResultPanelProps) => {
  const {
    loading: booksLoading,
    books,
    count: booksCount,
  } = useSelector((state: AppState) => state.searchBooks);
  const {
    loading: authorsLoading,
    authors,
    count: authorsCount,
  } = useSelector((state: AppState) => state.searchAuthors);

  let maxPageNum = 0;
  if (currentDisplay === 'books') {
    maxPageNum = Math.ceil(booksCount / limit);
  } else {
    maxPageNum = Math.ceil(authorsCount / limit);
  }

  // Settings handlers
  const settingsDisplay = (
    currentPage: number,
    limit: number,
    booksCount: number,
    authorsCount: number
  ) => {
    let count = 0;
    if (currentDisplay === 'books') {
      count = booksCount;
    } else {
      count = authorsCount;
    }

    let fromResultNum = 1 + limit * (currentPage - 1);
    let toResultNum = limit * currentPage < count ? limit * currentPage : count;
    if (count === 0) {
      return `Showing 0 result`;
    }
    if (fromResultNum === count) {
      return `Showing last result of ${count}`;
    }
    return `Showing ${fromResultNum} - ${toResultNum} results of ${count}`;
  };

  // For results
  const displayResults = () => {
    if (currentDisplay === 'books') {
      if (booksLoading) {
        return <></>;
      } else {
        return books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            lastItem={book === books[books.length - 1]}
          />
        ));
      }
    } else {
      if (authorsLoading) {
        return <></>;
      } else {
        return authors.map((author) => (
          <AuthorItem
            key={author._id}
            author={author}
            lastItem={author === authors[authors.length - 1]}
          />
        ));
      }
    }
  };

  // For pagination
  const pageNumbersDisplay = (currentPage: number, lastPage: number) => {
    if (lastPage <= 5) {
      let resultArr = [];
      for (let i = 1; i <= lastPage; i++) {
        resultArr.push(i);
      }
      return resultArr;
    }

    if (currentPage < 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage > lastPage - 2) {
      return [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <div className='result-panel'>
      <div className='settings'>
        <span className='settings__column settings__column-left'>
          {settingsDisplay(currentPage, limit, booksCount, authorsCount)}
        </span>
        <div className='settings__column settings__column-right'>
          <div className='settings__item settings__item-limit'>
            <label htmlFor='limit'>Limit</label>
            <select
              name='limit'
              id='limit'
              onChange={limitChangeHandler}
              value={limit}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className='settings__item settings__item-sort'>
            <label htmlFor='sort'>Sort</label>
            {currentDisplay === 'books' ? (
              <select
                name='sort'
                id='sort'
                onChange={sortChangeHandler}
                value={sort}
              >
                <option value={'title-asc'}>Title (Asc)</option>
                <option value={'title-des'}>Title (Des)</option>
                <option value={'publishedDate-asc'}>
                  Published Date (Asc)
                </option>
                <option value={'publishedDate-des'}>
                  Published Date (Des)
                </option>
              </select>
            ) : (
              <select
                name='sort'
                id='sort'
                onChange={sortChangeHandler}
                value={sort}
              >
                <option value={'firstName-asc'}>First Name (Asc)</option>
                <option value={'firstName-des'}>First Name (Des)</option>
              </select>
            )}
          </div>
        </div>
      </div>
      <div className='display'>{displayResults()}</div>
      <div className='pagination'>
        <button
          className={`btn btn-first ${currentPage <= 1 && 'disabled'} ${
            maxPageNum <= 5 && 'hidden'
          }`}
          onClick={() => changePageByArrowHandler('first')}
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          className={`btn btn-previous ${currentPage <= 1 && 'disabled'} ${
            maxPageNum <= 5 && 'hidden'
          }`}
          onClick={() => changePageByArrowHandler('previous')}
        >
          <RiArrowDropLeftLine />
        </button>
        {pageNumbersDisplay(currentPage, maxPageNum).map((num) => (
          <button
            key={num}
            className={`btn btn-page ${currentPage === num && 'current'}`}
            onClick={() => changePageByNumHandler(num)}
          >
            {num}
          </button>
        ))}
        <button
          className={`btn btn-next ${currentPage >= maxPageNum && 'disabled'} ${
            maxPageNum <= 5 && 'hidden'
          }`}
          onClick={() => changePageByArrowHandler('next')}
        >
          <RiArrowDropRightLine />
        </button>
        <button
          className={`btn btn-last ${currentPage >= maxPageNum && 'disabled'} ${
            maxPageNum <= 5 && 'hidden'
          }`}
          onClick={() => changePageByArrowHandler('last')}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default ResultPanel;
