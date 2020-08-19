import { ADD_MYCLASS } from './actionTypes';

const initialState = {
  myClasses: [],
  // exploreClasses: [],
  // categories: []
}

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_MYCLASS:
      return { ...state, myClasses: [...state.myClasses, action.payload] };

    default:
      return state;
  }
}