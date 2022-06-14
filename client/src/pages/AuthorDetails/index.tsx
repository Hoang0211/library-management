import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';

import {
  clearGetAuthorDetailsError,
  deleteAuthor,
  resetDeleteAuthor,
  clearDeleteAuthorError,
} from '../../redux/actions';
import { AppState, Role } from '../../types';
import './_authorDetails.scss';

const AuthorDetails = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { user, token } = useSelector((state: AppState) => state.user);
  const { loading, error, author } = useSelector(
    (state: AppState) => state.getAuthorDetails
  );
  const { error: deleteError, deleted } = useSelector(
    (state: AppState) => state.deleteAuthor
  );

  const { authorId } = useParams<{ authorId?: string }>();

  const deleteAuthorHandler = () => {
    if (authorId) {
      dispatch(deleteAuthor(token, authorId));
    }
  };

  const navigateToEditHandler = () => {
    navigate(`/authors/edit/${authorId}`);
  };

  const navigateToHomeHandler = () => {
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
      dispatch(clearGetAuthorDetailsError());
    }

    if (deleteError) {
      alert(deleteError.message);
      dispatch(clearDeleteAuthorError());
    }

    if (deleted) {
      alert('Deleted author successfully!');
      navigate('/');
      dispatch(resetDeleteAuthor());
    }
  }, [dispatch, navigate, error, deleteError, deleted]);

  return (
    <main className='author-details'>
      <div className='container'>
        <div className='header'>
          <h2 className='title'>Author Details</h2>
          {user?.role === Role.Admin && (
            <div className='btns'>
              <button className='btn btn-edit' onClick={navigateToEditHandler}>
                <MdEdit />
              </button>
              <button className='btn btn-delete' onClick={deleteAuthorHandler}>
                <MdDelete />
              </button>
            </div>
          )}
        </div>
        <p className='first-name'>
          First name: {!loading && author && author.firstName}
        </p>
        <p className='last-name'>
          Last name: {!loading && author && author.lastName}
        </p>
        <p className='biography'>
          Biography: {!loading && author && author.biography}
        </p>
        <p className='book-list'>List of book:</p>
        <ul>
          {!loading &&
            author &&
            author.books.map((book) => <li key={book._id}>{book.title}</li>)}
        </ul>
        <button className='btn btn-home' onClick={navigateToHomeHandler}>
          Home
        </button>
      </div>
    </main>
  );
};

export default AuthorDetails;
