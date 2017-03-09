import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer';

const logger = store => next => (action) => {
  console.debug('estado actual', store.getState());
  console.debug('acción despachada', action);
  const result = next(action);
  console.debug('estado actual', store.getState());
  return result;
};

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

export default store;
