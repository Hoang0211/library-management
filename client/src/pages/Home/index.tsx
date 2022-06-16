import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdNavigateNext } from 'react-icons/md';

import PageWrapper from '../../components/layout/PageWrapper';
import SearchForm from '../../components/SearchForm';
import ResultPanel from '../../components/ResultPanel';
import {
  changeCurrentDisplay,
  searchAllBooks,
  clearSearchAllBooksError,
  searchAllAuthors,
  clearSearchAllAuthorsError,
} from '../../redux/actions';
import { AppState, Role, Category, Status } from '../../types';
import './_home.scss';

const Home = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { currentDisplay } = useSelector((state: AppState) => state.display);
  const { user } = useSelector((state: AppState) => state.user);
  const { error: booksError, count: booksCount } = useSelector(
    (state: AppState) => state.searchBooks
  );
  const { error: authorsError, count: authorsCount } = useSelector(
    (state: AppState) => state.searchAuthors
  );

  // ResultPanel states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('title-asc');

  // Search form states
  const [category, setCategory] = useState([
    Category.Article,
    Category.Book,
    Category.Journal,
    Category.Thesis,
    Category.Other,
  ]);
  const [status, setStatus] = useState([Status.Available, Status.Borrowed]);
  const [selectedCategories, setSelectedCategories] = useState([
    Category.Article,
    Category.Book,
    Category.Journal,
    Category.Thesis,
    Category.Other,
  ]);
  const [selectedStatuses, setSelectedStatuses] = useState([
    Status.Available,
    Status.Borrowed,
  ]);
  const [keywordInput, setKeywordInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(true);
  const [selectedBook, setSelectedBook] = useState(true);
  const [selectedJournal, setSelectedJournal] = useState(true);
  const [selectedThesis, setSelectedThesis] = useState(true);
  const [selectedOther, setSelectedOther] = useState(true);
  const [selectedAvailable, setSelectedAvailable] = useState(true);
  const [selectedBorrowed, setSelectedBorrowed] = useState(true);

  // Title action handlers
  const changeCurrentDisplayHandler = () => {
    dispatch(changeCurrentDisplay());
  };
  const navigateToAddPage = () => {
    if (currentDisplay === 'books') {
      navigate('/books/add');
    } else {
      navigate('/authors/add');
    }
  };

  // Result panel handlers
  const limitChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    setLimit(Number(e.currentTarget.value));
  };
  const sortChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    setSort(e.currentTarget.value);
  };
  const changePageByArrowHandler = (
    action: 'first' | 'previous' | 'next' | 'last'
  ) => {
    if (action === 'first') {
      setCurrentPage(1);
    } else if (action === 'previous') {
      setCurrentPage((prevState) => prevState - 1);
    } else if (action === 'next') {
      setCurrentPage((prevState) => prevState + 1);
    } else {
      let count = 0;
      if (currentDisplay === 'books') {
        count = booksCount;
      } else {
        count = authorsCount;
      }
      setCurrentPage(Math.ceil(count / limit));
    }
  };
  const changePageByNumHandler = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  // Search form handlers
  const keywordInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setKeywordInput(e.currentTarget.value);
  };
  const categoriesCheckboxHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.currentTarget.checked) {
      if (!selectedCategories.includes(value as Category)) {
        setSelectedCategories((prevState) => [...prevState, value as Category]);
      }
    } else {
      setSelectedCategories((prevState) =>
        prevState.filter((selectedCategory) => selectedCategory !== value)
      );
    }

    if (value === Category.Article) {
      setSelectedArticle((prevState) => !prevState);
    } else if (value === Category.Book) {
      setSelectedBook((prevState) => !prevState);
    } else if (value === Category.Journal) {
      setSelectedJournal((prevState) => !prevState);
    } else if (value === Category.Thesis) {
      setSelectedThesis((prevState) => !prevState);
    } else if (value === Category.Other) {
      setSelectedOther((prevState) => !prevState);
    }
  };
  const statusesCheckboxHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.currentTarget.checked) {
      if (!selectedStatuses.includes(value as Status)) {
        setSelectedStatuses((prevState) => [...prevState, value as Status]);
      }
    } else {
      setSelectedStatuses((prevState) =>
        prevState.filter((selectedCategory) => selectedCategory !== value)
      );
    }

    if (value === Status.Available) {
      setSelectedAvailable((prevState) => !prevState);
    } else if (value === Status.Borrowed) {
      setSelectedBorrowed((prevState) => !prevState);
    }
  };
  const searchBookSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(keywordInput);
    setCategory(selectedCategories);
    setStatus(selectedStatuses);
  };

  useEffect(() => {
    if (currentDisplay === 'books') {
      if (booksError) {
        alert(booksError);
        dispatch(clearSearchAllBooksError());
      }

      dispatch(
        searchAllBooks(
          keyword,
          category.join('%2B'),
          status.join('%2B'),
          limit.toString(),
          currentPage.toString(),
          sort.split('-')[0],
          sort.split('-')[1]
        )
      );
    } else {
      if (authorsError) {
        alert(authorsError);
        dispatch(clearSearchAllAuthorsError());
      }

      dispatch(
        searchAllAuthors(
          keyword,
          limit.toString(),
          currentPage.toString(),
          sort.split('-')[0],
          sort.split('-')[1]
        )
      );
    }
  }, [
    dispatch,
    currentDisplay,
    keyword,
    category,
    status,
    limit,
    currentPage,
    sort,
    authorsError,
    booksError,
  ]);

  return (
    <PageWrapper className='home'>
      <div className='title'>
        <h1>List of {currentDisplay === 'books' ? 'Books' : 'Authors'}</h1>
        <div className='actions'>
          {user?.role === Role.Admin && (
            <button className='action' onClick={navigateToAddPage}>
              Add {currentDisplay === 'books' ? 'Books' : 'Authors'}
            </button>
          )}
          <button className='action' onClick={changeCurrentDisplayHandler}>
            {currentDisplay === 'books' ? 'Authors' : 'Books'}{' '}
            <MdNavigateNext />
          </button>
        </div>
      </div>
      <div className='container'>
        <div className='container__column container__column-left'>
          <ResultPanel
            currentPage={currentPage}
            limit={limit}
            sort={sort}
            limitChangeHandler={limitChangeHandler}
            sortChangeHandler={sortChangeHandler}
            changePageByArrowHandler={changePageByArrowHandler}
            changePageByNumHandler={changePageByNumHandler}
          />
        </div>
        <div className='container__column container__column-right'>
          <SearchForm
            currentDisplay={currentDisplay}
            keywordInput={keywordInput}
            selectedArticle={selectedArticle}
            selectedBook={selectedBook}
            selectedJournal={selectedJournal}
            selectedThesis={selectedThesis}
            selectedOther={selectedOther}
            selectedAvailable={selectedAvailable}
            selectedBorrowed={selectedBorrowed}
            keywordInputChangeHandler={keywordInputChangeHandler}
            categoriesCheckboxHandler={categoriesCheckboxHandler}
            statusesCheckboxHandler={statusesCheckboxHandler}
            searchBookSubmitHandler={searchBookSubmitHandler}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
