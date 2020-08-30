import { reducer } from './reducers'
import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

export const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk)
);
