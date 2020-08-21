

import { reducer } from './reducers'
import ReduxThunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import {createStore} from 'redux';

export const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk)
);
