import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PageWrapper from '../../components/layout/PageWrapper';
import AllAuthorModal from '../../components/AllAuthorModal';
import { addBook, resetAddBook, clearAddBookError } from '../../redux/actions';
import { AppState, Book, Category, Author } from '../../types';
import './_addBook.scss';

const AddBook = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { token } = useSelector((state: AppState) => state.user);
  const { loading, error, added } = useSelector(
    (state: AppState) => state.addBook
  );

  // Inputs onChange value handler
  const [isbnInput, setIsbnInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [authorsInput, setAuthorsInput] = useState<Author[]>([]);
  const [publisherInput, setPublisherInput] = useState('');
  const [publishedDateInput, setPublishedDateInput] = useState('');
  const [categoryInput, setCategoryInput] = useState<Category>(
    Category.Article
  );
  const [pageNumInput, setPageNumInput] = useState('');

  // AuthorId array handler
  const [showAuthors, setShowAuthors] = useState(false);

  const isbnInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setIsbnInput(e.currentTarget.value);
  };
  const titleInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTitleInput(e.currentTarget.value);
  };
  const descriptionInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setDescriptionInput(e.currentTarget.value);
  };
  const publisherInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setPublisherInput(e.currentTarget.value);
  };
  const publishedDateInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setPublishedDateInput(e.currentTarget.value);
  };
  const categoryChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategoryInput(e.currentTarget.value as Category);
  };
  const pageNumInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPageNumInput(e.currentTarget.value);
  };
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isbnInput) {
      alert('Please enter ISBN number!');
      return;
    }
    if (!titleInput) {
      alert('Please enter title!');
      return;
    }
    if (!descriptionInput) {
      alert('Please enter description!');
      return;
    }
    if (authorsInput.length < 1) {
      alert('Please select atleast 1 author!');
      return;
    }
    if (!publisherInput) {
      alert('Please enter publisher!');
      return;
    }
    if (!publishedDateInput) {
      alert('Please enter published date!');
      return;
    }
    if (isNaN(Date.parse(publishedDateInput))) {
      alert('Please enter published date in following format!');
      return;
    }
    if (!pageNumInput) {
      alert('Please enter number of page!');
      return;
    }
    if (isNaN(Number(pageNumInput))) {
      alert('Please enter a number for number of the page!');
      return;
    }

    const formData: Partial<Book> = {
      isbn: isbnInput,
      title: titleInput,
      description: descriptionInput,
      authors: authorsInput,
      publisher: publisherInput,
      publishedDate: publishedDateInput,
      category: categoryInput,
      numPage: Number(pageNumInput),
    };

    dispatch(addBook(token, formData));
  };

  const discardHandler = () => {
    navigate('/');
  };

  const addAuthorInputHandler = (author: Author) => {
    setAuthorsInput([...authorsInput, author]);
  };

  const removeAuthorInputHandler = (author: Author) => {
    setAuthorsInput(
      authorsInput.filter((thisAuthor) => thisAuthor._id !== author._id)
    );
  };

  const toggleListOfAuthorHandler = () => {
    setShowAuthors((prevState) => !prevState);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearAddBookError());
    }

    if (added) {
      alert('Created book successfully!');
      navigate('/');
      dispatch(resetAddBook());
    }
  }, [dispatch, navigate, error, added]);

  return (
    <PageWrapper className='add-book'>
      <div className='title'>
        <h1>New Book</h1>
        <div className='actions'>
          <button className='action' onClick={discardHandler}>
            Home
          </button>
        </div>
      </div>
      <div className='container container-add'>
        <form onSubmit={formSubmitHandler}>
          <div className='input-controller'>
            <label htmlFor='isbn'>ISBN:</label>
            <input
              id='isbn'
              type='text'
              placeholder='Enter ISBN...'
              onChange={isbnInputChangeHandler}
              value={isbnInput}
            ></input>
          </div>
          <div className='input-controller'>
            <label htmlFor='book-title'>Title:</label>
            <input
              id='book-title'
              type='text'
              placeholder='Enter title...'
              onChange={titleInputChangeHandler}
              value={titleInput}
            ></input>
          </div>
          <div className='input-controller'>
            <label htmlFor='description'>Description:</label>
            <input
              id='description'
              placeholder='Enter description...'
              onChange={descriptionInputChangeHandler}
              value={descriptionInput}
            ></input>
          </div>
          <div className='input-controller'>
            <label htmlFor='authors'>
              Authors:{' '}
              {authorsInput
                .map((author) => author.firstName + ' ' + author.lastName)
                .join(', ')}
            </label>
            <button
              id='authors'
              className='select select-authors'
              type='button'
              onClick={toggleListOfAuthorHandler}
            >
              Show list of author
            </button>
            {showAuthors && (
              <AllAuthorModal
                authorsInput={authorsInput}
                addAuthorInputHandler={addAuthorInputHandler}
                removeAuthorInputHandler={removeAuthorInputHandler}
                onCloseHandler={toggleListOfAuthorHandler}
              />
            )}
          </div>
          <div className='input-controller'>
            <label htmlFor='publisher'>Publisher:</label>
            <input
              id='publisher'
              type='text'
              placeholder='Enter publisher...'
              onChange={publisherInputChangeHandler}
              value={publisherInput}
            ></input>
          </div>
          <div className='input-controller'>
            <label htmlFor='published-date'>Published date:</label>
            <input
              id='published-date'
              type='text'
              placeholder='Enter published date...'
              onChange={publishedDateInputChangeHandler}
              value={publishedDateInput}
            ></input>
          </div>
          <div className='input-controller'>
            <label htmlFor='category'>Category:</label>
            <select
              id='category'
              className='select select-category'
              onChange={categoryChangeHandler}
              value={categoryInput}
            >
              <option value={Category.Article}>Article</option>
              <option value={Category.Book}>Book</option>
              <option value={Category.Journal}>Journal</option>
              <option value={Category.Thesis}>Thesis</option>
              <option value={Category.Other}>Other</option>
            </select>
          </div>
          <div className='input-controller'>
            <label htmlFor='page-num'>Number of pages:</label>
            <input
              id='page-num'
              type='text'
              placeholder='Enter number of pages...'
              onChange={pageNumInputChangeHandler}
              value={pageNumInput}
            ></input>
          </div>
          <div className='form-actions'>
            <button
              className='form-action form-action-add'
              type='submit'
              onClick={formSubmitHandler}
              disabled={loading}
            >
              Add
            </button>
            <button
              className='form-action form-action-discard'
              type='button'
              onClick={discardHandler}
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddBook;
