const mockClass = {
  class_id:'1a',
  classname: 'Yoga',
  classtime: '2020-09-21T16:00:00.000Z',
  classlength: '90',
  place_id: 'abs_123',
  signedup: '10',
  limit: '20',
  cost: '5',
  description: 'Yoga class to start your day with good energy',
  category_id: 1,
  teacher_id: 1,
}

const mockCategories = [
  {category: 'Dance', id: 1},
  {category: 'Health', id: 2},
  {category: 'Cooking', id: 3},
  {category: 'Meetup', id: 4}
];

const mockUser = {
  id: 1,
  firstname: 'Bart',
  lastname: 'Simpson',
  email: 'bart@simpson.com',
}

import { ADD_MYCLASS } from './actionTypes';
import { TEACHER_ADD_CLASS, TEACHER_DELETE_CLASS } from './actionTypes';

const initialState = {
  myClasses: [],
  exploreClasses: [],
  categories: mockCategories,
  teacherClasses: [],
  user: mockUser
}

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_MYCLASS:
      return { ...state, myClasses: [...state.myClasses, action.payload] };
    case TEACHER_ADD_CLASS:
      return {...state, teacherClasses: [...state.teacherClasses, action.payload]};
    case TEACHER_DELETE_CLASS:
      return {...state, teacherClasses: [...state.teacherClasses].filter(classItem=>classItem.class_id!=action.payload.class_id)}
    default:
      return state;
  }
}