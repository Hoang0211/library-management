import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';

import PageWrapper from '../../components/layout/PageWrapper';
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

  const navigateToEditPage = () => {
    navigate(`/books/edit/${bookId}`);
  };

  const navigateToHomePage = () => {
    navigate('/');
  };

  const deleteBookHandler = () => {
    if (bookId) {
      dispatch(deleteBook(token, bookId));
    }
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
    <PageWrapper className='book-details'>
      <div className='title'>
        <h1>Book Details</h1>
        <div className='actions'>
          <button className='action' onClick={navigateToEditPage}>
            Edit
          </button>
          <button className='action' onClick={deleteBookHandler}>
            Delete
          </button>
          <button className='action' onClick={navigateToHomePage}>
            Home
          </button>
        </div>
      </div>
      <div className='container'>
        <h2 className='book-details__title'>
          {!loading && book && book.title}
        </h2>
        <div className='book-details__info'>
          <div className='book-details__info-left'>
            {' '}
            <p className='book-details__isbn'>
              ISBN: {!loading && book && book.isbn}
            </p>
            <p className='book-details__description'>
              Description: {!loading && book && book.description}
            </p>
            <p className='book-details__authors'>
              Authors:{' '}
              {!loading &&
                book &&
                book.authors
                  .map((author) => author.firstName + ' ' + author.lastName)
                  .join(', ')}
            </p>
            <p className='book-details__category'>
              Category:{' '}
              {!loading &&
                book &&
                book.category.charAt(0).toUpperCase() + book.category.slice(1)}
            </p>
          </div>
          <div className='book-details__info-right'>
            {' '}
            <p className='book-details__publisher'>
              Publisher: {!loading && book && book.publisher}
            </p>
            <p className='book-details__published-date'>
              Published date:{' '}
              {!loading &&
                book &&
                new Date(book.publishedDate).toLocaleDateString()}
            </p>
            <p className='book-details__num-page'>
              Number of pages: {!loading && book && book.numPage}
            </p>
            <p className='book-details__status'>
              Status:{' '}
              {!loading &&
                book &&
                book.status.charAt(0).toUpperCase() + book.status.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>

    // <main className='book-details'>
    //   <div className='book-details__container'>
    //     <div className='header'>
    //       <h2 className='title'>Book Details</h2>
    //       {user?.role === Role.Admin && (
    //         <div className='btns'>
    //           <button className='btn btn-edit' onClick={navigateToEditHandler}>
    //             <MdEdit />
    //           </button>
    //           <button className='btn btn-delete' onClick={deleteBookHandler}>
    //             <MdDelete />
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //     <p className='isbn'>ISBN: {!loading && book && book.isbn}</p>
    //     <p className='book-title'>Title: {!loading && book && book.title}</p>
    //     <p className='description'>
    //       Description: {!loading && book && book.description}
    //     </p>
    //     <p className='authors'>
    //       Authors:{' '}
    //       {!loading &&
    //         book &&
    //         book.authors
    //           .map((author) => author.firstName + ' ' + author.lastName)
    //           .join(', ')}
    //     </p>
    //     <p className='publisher'>
    //       Publisher: {!loading && book && book.publisher}
    //     </p>
    //     <p className='published-date'>
    //       Published date:{' '}
    //       {!loading &&
    //         book &&
    //         new Date(book.publishedDate).toLocaleDateString()}
    //     </p>
    //     <p className='category'>
    //       Category:{' '}
    //       {!loading &&
    //         book &&
    //         book.category.charAt(0).toUpperCase() + book.category.slice(1)}
    //     </p>
    //     <p className='num-page'>
    //       Number of pages: {!loading && book && book.numPage}
    //     </p>
    //     <p className='status'>
    //       Status:{' '}
    //       {!loading &&
    //         book &&
    //         book.status.charAt(0).toUpperCase() + book.status.slice(1)}
    //     </p>
    //     <button className='btn btn-home' onClick={navigateToHomeHandler}>
    //       Home
    //     </button>
    //   </div>
    // </main>
  );
};

export default BookDetails;
