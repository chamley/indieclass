import { createStore } from "redux";

import { reducer } from './reducers'

import ReduxThunk from 'redux-thunk';

import { applyMiddleware } from 'redux';

export const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk)
);