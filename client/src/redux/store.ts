import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { AppState, User } from '../types';
import createRootReducer from './reducers';

export const getUserFromLocal = (): User | null => {
  const user = localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

export const getTokenFromLocal = (): string => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    return JSON.parse(token);
  } else {
    return '';
  }
};

const initState: AppState = {
  display: {
    currentDisplay: 'books',
  },

  user: {
    loading: false,
    error: null,
    user: getUserFromLocal(),
    token: getTokenFromLocal(),
  },
  editUser: {
    loading: false,
    error: null,
    updated: false,
    updatedUser: null,
  },

  getBooks: {
    loading: false,
    error: null,
    books: [],
  },
  searchBooks: {
    loading: false,
    error: null,
    books: [],
    count: 0,
  },
  getBookDetails: {
    loading: false,
    error: null,
    book: null,
  },
  addBook: {
    loading: false,
    error: null,
    added: false,
  },
  editBook: {
    loading: false,
    error: null,
    updated: false,
  },
  deleteBook: {
    loading: false,
    error: null,
    deleted: false,
  },

  getAuthors: {
    loading: false,
    error: null,
    authors: [],
  },
  searchAuthors: {
    loading: false,
    error: null,
    authors: [],
    count: 0,
  },
  getAuthorDetails: {
    loading: false,
    error: null,
    author: null,
  },
  addAuthor: {
    loading: false,
    error: null,
    added: false,
  },
  editAuthor: {
    loading: false,
    error: null,
    updated: false,
  },
  deleteAuthor: {
    loading: false,
    error: null,
    deleted: false,
  },

  getBorrows: {
    loading: false,
    error: null,
    borrows: [],
  },
  borrowBooks: {
    loading: false,
    error: null,
    borrowed: false,
  },
  returnBook: {
    loading: false,
    error: null,
    returned: false,
  },
};

export default function makeStore(initialState = initState) {
  const middlewares = [thunk];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
