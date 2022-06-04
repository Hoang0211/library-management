import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SearchForm from '../../components/SearchForm';
import ResultPanel from '../../components/ResultPanel';
import { getAllAuthor } from '../../redux/actions';
import './_home.scss';

const Home = () => {
  const dispatch = useDispatch<any>();

  const [currentDisplay, setCurrentDisplay] = useState<'books' | 'authors'>(
    'authors'
  );

  useEffect(() => {
    dispatch(getAllAuthor());
  }, [dispatch]);

  const changeCurrentDisplay = () => {
    if (currentDisplay === 'books') {
      setCurrentDisplay('authors');
    } else {
      setCurrentDisplay('books');
    }
  };

  return (
    <main className='home'>
      <div className='home__show'>
        <button
          className='btn home__show-books'
          onClick={changeCurrentDisplay}
          disabled={currentDisplay === 'books'}
        >
          Books
        </button>
        <button
          className='btn home__show-authors'
          onClick={changeCurrentDisplay}
          disabled={currentDisplay === 'authors'}
        >
          Authors
        </button>
      </div>
      <SearchForm currentDisplay={currentDisplay} />
      <ResultPanel currentDisplay={currentDisplay} />
    </main>
  );
};

export default Home;
