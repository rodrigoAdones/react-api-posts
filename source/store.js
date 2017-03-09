import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const logger = store => next => (action) => {
  console.debug('estado actual 1', store.getState());
  console.debug('acción despachada', action);
  const result = next(action);
  console.debug('estado actual 2', store.getState());
  return result;
};

const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    thunk,
  ),
);

export default store;
