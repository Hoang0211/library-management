import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';

import {
  clearGetBookDetailsError,
  deleteBook,
  resetDeleteBook,
  clearDeleteBookError,
} from '../../redux/actions';
import { AppState, Role } from '../../types';
import './_bookDetails.scss';

const BookDetails = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { user, token } = useSelector((state: AppState) => state.user);
  const { loading, error, book } = useSelector(
    (state: AppState) => state.getBookDetails
  );
  const { error: deleteError, deleted } = useSelector(
    (state: AppState) => state.deleteBook
  );

  const { bookId } = useParams<{ bookId?: string }>();

  const deleteBookHandler = () => {
    if (bookId) {
      dispatch(deleteBook(token, bookId));
    }
  };

  const navigateToEditHandler = () => {
    navigate(`/books/edit/${bookId}`);
  };

  const navigateToHomeHandler = () => {
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
      dispatch(clearGetBookDetailsError());
    }

    if (deleteError) {
      alert(deleteError.message);
      dispatch(clearDeleteBookError());
    }

    if (deleted) {
      alert('Deleted book successfully!');
      navigate('/');
      dispatch(resetDeleteBook());
    }
  }, [dispatch, navigate, error, deleteError, deleted]);

  return (
    <main className='book-details'>
      <div className='container'>
        <div className='header'>
          <h2 className='title'>Book Details</h2>
          {user?.role === Role.Admin && (
            <div className='btns'>
              <button className='btn btn-edit' onClick={navigateToEditHandler}>
                <MdEdit />
              </button>
              <button className='btn btn-delete' onClick={deleteBookHandler}>
                <MdDelete />
              </button>
            </div>
          )}
        </div>
        <p className='isbn'>ISBN: {!loading && book && book.isbn}</p>
        <p className='book-title'>Title: {!loading && book && book.title}</p>
        <p className='description'>
          Description: {!loading && book && book.description}
        </p>
        <p className='authors'>
          Authors:{' '}
          {!loading &&
            book &&
            book.authors
              .map((author) => author.firstName + ' ' + author.lastName)
              .join(', ')}
        </p>
        <p className='publisher'>
          Publisher: {!loading && book && book.publisher}
        </p>
        <p className='published-date'>
          Published date:{' '}
          {!loading &&
            book &&
            new Date(book.publishedDate).toLocaleDateString()}
        </p>
        <p className='category'>
          Category:{' '}
          {!loading &&
            book &&
            book.category.charAt(0).toUpperCase() + book.category.slice(1)}
        </p>
        <p className='num-page'>
          Number of pages: {!loading && book && book.numPage}
        </p>
        <p className='status'>
          Status:{' '}
          {!loading &&
            book &&
            book.status.charAt(0).toUpperCase() + book.status.slice(1)}
        </p>
        <button className='btn btn-home' onClick={navigateToHomeHandler}>
          Home
        </button>
      </div>
    </main>
  );
};

export default BookDetails;
