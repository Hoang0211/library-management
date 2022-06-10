import React from 'react';

import './_returnBook.scss';

const ReturnBook = () => {
  return (
    <main className='return-book'>
      <div className='container'>
        <h1 className='title'>Return Book</h1>
        <div className='borrows-list'></div>
      </div>
    </main>
  );
};

export default ReturnBook;
