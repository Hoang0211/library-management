import React, { useState } from 'react';

import SearchForm from '../../components/SearchForm';
import ResultPanel from '../../components/ResultPanel';
import './_home.scss';

const Home = () => {
  const [currentDisplay, setCurrentDisplay] = useState<'books' | 'authors'>(
    'books'
  );

  const changeCurrentDisplayHandler = () => {
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
          onClick={changeCurrentDisplayHandler}
          disabled={currentDisplay === 'books'}
        >
          Books
        </button>
        <button
          className='btn home__show-authors'
          onClick={changeCurrentDisplayHandler}
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
