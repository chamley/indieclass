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
  user_id: 1,
  firstname: 'Bart',
  lastname: 'Simpson',
  email: 'bart@simpson.com',
}


import { TEACHER_ADD_CLASS, TEACHER_DELETE_CLASS, SET_CATEGORIES } from './actionTypes';

const initialState = {
  myClasses: [],
  exploreClasses: [],
  categories: mockCategories,
  teacherClasses: [],
  user: mockUser
}

export const reducer = function (state = initialState, action) {
  console.warn(action.payload.class_id)
  
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload }
    case TEACHER_ADD_CLASS:
      return {...state, teacherClasses: [...state.teacherClasses, action.payload]};
    case TEACHER_DELETE_CLASS:
      return {...state, teacherClasses: [...state.teacherClasses].filter(classItem=>classItem.class_id != action.payload.class_id)}
    default:
      return state;
  }
}