import * as Redux from "redux";

import { reducer } from './reducers'
import ReduxThunk from 'redux-thunk';

export const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(ReduxThunk)
)