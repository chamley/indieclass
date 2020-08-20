
export const mockUser = {
  user_id: "f350cfc1-e1f8-11ea-bd67-f333cd1f538c",
  firstname: 'Bart',
  lastname: 'Simpson',
  email: 'bart@simpson.com',
}

import { 
  ADD_MYCLASS, 
  REMOVE_MYCLASS, 
  SET_EXPLORE_CLASSES, 
  SET_MYCLASSES, 
  SET_EXPLORE_CATEGORY, 
  SET_CATEGORIES, 
  SET_CLASS 
} from './actionTypes'

const initialState = {
  myClasses: [],
  exploreClasses: [],//mockClassArr,
  categories: [],
  teacherClasses: [],
  user: mockUser,
  category_id: null,
  viewClass: null
}

// localstorage - async storage - check that it works with expo

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_MYCLASS:
      return { ...state, myClasses: [...state.myClasses, action.payload] };

    // case REMOVE_MYCLASS:
    //   return { ...state, }

    case SET_EXPLORE_CLASSES:
      return { ...state, exploreClasses: action.payload }
    
    case SET_MYCLASSES:
      return { ...state, myClasses: action.payload }

    case SET_EXPLORE_CATEGORY:
      return { ...state, category_id: action.payload }

    case SET_CATEGORIES:
      return { ...state, categories: action.payload }

    case SET_CLASS:
      return { ...state, viewClass: action.payload }
      
    default:
      return state;
  }
}