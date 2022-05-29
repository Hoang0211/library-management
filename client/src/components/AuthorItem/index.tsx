import React from 'react';

import { Author } from '../../types';
import './_authorItem.scss';

type AuthorItemProps = {
  author: Author;
  lastItem: boolean;
};

const AuthorItem = ({ author, lastItem }: AuthorItemProps) => {
  return (
    <div className={`author-item ${lastItem && 'author-item-last'}`}>
      <div className='info'>
        <p className='title'>
          {author.firstName} {author.lastName}
        </p>
        <p>Number of books: {author.books.length}</p>
      </div>
      <button className='btn btn-details'>More Details</button>
    </div>
  );
};

export default AuthorItem;
