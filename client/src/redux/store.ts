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
  user: {
    loading: false,
    error: null,
    user: getUserFromLocal(),
    token: getTokenFromLocal(),
  },
  author: {
    loading: false,
    error: null,
    authors: [],
    author: null,
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
