const mockClass = [
  {
    class_id: 'f6127b60-e567-11ea-b55f-b1ac848f12fa',
    classname: 'Yoga',
    classtime: '2020-09-21T16:00:00.000Z',
    classlength: '90',
    place_id: 'ChIJx27NboJw44kRE81mLKwFm9o',
    address: '125 Summer St, Boston, MA',
    lat: 42.3530628,
    lng: -71.05750739999999,
    signedup: '10',
    limit: '20',
    cost: '5',
    description: 'Yoga class to start your day with good energy',
    category_id: 1,
    teacher_id: 1,
  },
];

const mockCategories = [
  { category: 'Dance', id: 1 },
  { category: 'Health', id: 2 },
  { category: 'Cooking', id: 3 },
  { category: 'Meetup', id: 4 },
];

const mockUser = {
  user_id: '9f5b9240-e30d-11ea-88e7-2f709b9055ba',
  firstname: 'Bart',
  lastname: 'Simpson',
  email: 'bart@simpson.com',
};

import {
  TEACHER_ADD_CLASS,
  TEACHER_DELETE_CLASS,
  SET_CATEGORIES,
} from './actionTypes';
import {
  ADD_MYCLASS,
  REMOVE_MYCLASS,
  SET_EXPLORE_CLASSES,
  SET_MYCLASSES,
  SET_EXPLORE_CATEGORY,
  SET_CLASS,
} from './actionTypes';

const initialState = {
  myClasses: [],
  exploreClasses: [], //mockClassArr,
  categories: [],
  teacherClasses: [],
  user: mockUser,
  category_id: null,
  viewClass: null,
};

// localstorage - async storage - check that it works with expo

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case TEACHER_ADD_CLASS:
      return {
        ...state,
        teacherClasses: [...state.teacherClasses, action.payload],
      };
    case TEACHER_DELETE_CLASS:
      return {
        ...state,
        teacherClasses: [...state.teacherClasses].filter(
          (classItem) => classItem.class_id != action.payload.class_id
        ),
      };
    case ADD_MYCLASS:
      return { ...state, myClasses: [...state.myClasses, action.payload] };

    // case REMOVE_MYCLASS:
    //   return { ...state, }

    case SET_EXPLORE_CLASSES:
      return { ...state, exploreClasses: action.payload };

    case SET_MYCLASSES:
      return { ...state, myClasses: action.payload };

    case SET_EXPLORE_CATEGORY:
      return { ...state, category_id: action.payload };

    case SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case SET_CLASS:
      return { ...state, viewClass: action.payload };

    default:
      return state;
  }
};
