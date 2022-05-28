import React from 'react';

import SearchForm from '../../components/SearchForm';
import ResultPanel from '../../components/ResultPanel';
import './_home.scss';

const Home = () => {
  return (
    <main className='home'>
      <div className='home__show'>
        <button className='btn home__show-books' disabled>
          Books
        </button>
        <button className='btn home__show-authors'>Authors</button>
      </div>
      <SearchForm />
      <ResultPanel />
    </main>
  );
};

export default Home;
