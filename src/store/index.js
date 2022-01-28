import { applyMiddleware, compose, createStore } from "redux";
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from './reducers';

/**
 * @function configureStore
 * @param {*} preloadedState - state that should be used as the initial reducer state
 * @returns {Function}
 */
const configureStore = (preloadedState) => {
  const middlewareEnhancer = applyMiddleware(reduxThunk);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);
  
  let store;

  if (process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, preloadedState, composeWithDevTools(composedEnhancers));
  } else {
    store = createStore(rootReducer, preloadedState, composedEnhancers);
  }

  return store;
};

export {configureStore};
