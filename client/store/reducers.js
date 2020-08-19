export const mockClass = {
  id: "fefc0650-e1f8-11ea-9dc4-0345c18ec23b",
  classname: 'Yoga',
  classtime: '2020-09-21T16:00:00.000Z',
  classlength: '90',
  place_id: 'abs_123',
  signedup: '10',
  limit: '20',
  cost: '5',
  description: 'Yoga class to start your day with good energy',
  category_id: "f350a8b0-e1f8-11ea-bd67-f333cd1f538c",
  teacher_id: "f350cfc1-e1f8-11ea-bd67-f333cd1f538c",
}

const mockCategories = [
  {category: 'Dance', id: 1},
  {category: 'Health', id: 2},
  {category: 'Cooking', id: 3},
  {category: 'Meetup', id: 4}
]

export const mockUser = {
  id: "f350cfc1-e1f8-11ea-bd67-f333cd1f538c",
  firstname: 'Bart',
  lastname: 'Simpson',
  email: 'bart@simpson.com',
}

import { ADD_MYCLASS, REMOVE_MYCLASS, SET_EXPLORE_CLASSES, SET_MYCLASSES } from './actionTypes'

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

    // case REMOVE_MYCLASS:
    //   return { ...state, }

    case SET_EXPLORE_CLASSES:
      return { ...state, exploreClasses: action.payload }
    
    case SET_MYCLASSES:
      return { ...state, myClasses: action.payload }
      
    default:
      return state;
  }
}