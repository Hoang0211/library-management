import React, { useState, useEffect } from 'react';

import SearchForm from '../../components/SearchForm';
import ResultPanel from '../../components/ResultPanel';
import './_home.scss';

const Home = () => {
  const [currentDisplay, setCurrentDisplay] = useState<'books' | 'authors'>(
    'books'
  );

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
