import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAuthorDetails } from '../../redux/actions';
import { Author } from '../../types';
import './_authorItem.scss';

type AuthorItemProps = {
  author: Author;
  lastItem: boolean;
};

const AuthorItem = ({ author, lastItem }: AuthorItemProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const navigateToAuthorDetailsHandler = () => {
    navigate(`/authors/${author._id}`);
    dispatch(getAuthorDetails(author._id));
  };

  return (
    <div className={`author-item ${lastItem && 'author-item-last'}`}>
      <div className='info'>
        <p className='title'>
          {author.firstName} {author.lastName}
        </p>
        <p>Number of books: {author.books.length}</p>
      </div>
      <button
        className='btn btn-details'
        onClick={navigateToAuthorDetailsHandler}
      >
        More Details
      </button>
    </div>
  );
};

export default AuthorItem;
