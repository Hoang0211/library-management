import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';

import { getAuthorDetails } from '../../redux/actions';
import { AppState, Role } from '../../types';
import './_authorDetails.scss';

const AuthorDetails = () => {
  const dispatch = useDispatch<any>();

  const { user } = useSelector((state: AppState) => state.user);
  const { loading, error, author } = useSelector(
    (state: AppState) => state.authorDetails
  );

  const { authorId } = useParams<{ authorId?: string }>();

  useEffect(() => {
    if (authorId) {
      dispatch(getAuthorDetails(authorId));
    }
  }, [dispatch, authorId]);

  return (
    <main className='author-detail'>
      <div className='container'>
        <div className='header'>
          <h2 className='title'>Author Details</h2>
          {user?.role === Role.Admin && (
            <div className='actions'>
              <Link to='/authors/edit' className='action action-edit'>
                <MdEdit />
              </Link>
              <button className='action action-delete'>
                <MdDelete />
              </button>
            </div>
          )}
        </div>
        {loading && <p className='loading'>Please wait...</p>}
        {!loading && author && (
          <>
            <p className='first-name'>First name: {author.firstName}</p>
            <p className='last-name'>Last name: {author.lastName}</p>
            <p className='biography'>Biography: {author.biography}</p>
            <p className='book-list'>List of book:</p>
            <ul>
              {author.books.map((book) => (
                <li>book</li>
              ))}
            </ul>
          </>
        )}
        <Link to='/' className='btn btn-home'>
          Home
        </Link>
      </div>
    </main>
  );
};

export default AuthorDetails;
