import { 
  ADD_MYCLASS, 
  REMOVE_MYCLASS, 
  SET_EXPLORE_CLASSES, 
  SET_MYCLASSES,
  SET_EXPLORE_CATEGORY, 
  SET_CLASS,
  SET_USER,
  SET_TEACHERCLASSES,
  TEACHER_ADD_CLASS,
  TEACHER_DELETE_CLASS,
  SET_CATEGORIES ,
  UPDATE_PAYMENT
} from './actionTypes'

const initialState = {
  myClasses: [],
  exploreClasses: [], 
  categories: [],
  teacherClasses: [],
  user: {
    firstname: null,
    lastname: null,
    token: null,
    paymentToken: '',
    lastfour: '' 
  },
  category_id: null,
  viewClass: null,
}

// localstorage - async storage - check that it works with expo

export const reducer = function (state = initialState, action) {
  console.log('action type', action.type);
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload }

    case TEACHER_ADD_CLASS:
      return {...state, teacherClasses: [...state.teacherClasses, action.payload]};

    case TEACHER_DELETE_CLASS:
      return {...state, teacherClasses: [...state.teacherClasses].filter(classItem=>classItem.class_id != action.payload.class_id)}
      
    case SET_TEACHERCLASSES:
      console.log('set teacher action type', action.type);
      return { ...state, teacherClasses: action.payload };

    case ADD_MYCLASS:
      return { ...state, myClasses: [...state.myClasses, action.payload] };

    case SET_EXPLORE_CLASSES:
      return { ...state, exploreClasses: action.payload };

    case SET_MYCLASSES:
      console.log('set myclasses action type', action.type);
      return { ...state, myClasses: action.payload };

    case SET_EXPLORE_CATEGORY:
      return { ...state, category_id: action.payload };

    case SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case SET_CLASS:
      return { ...state, viewClass: action.payload }

    case SET_USER:
      console.log('set user action type', action.type);
      return { ...state,
        user: 
        {
          ...state.user,  
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          token: action.payload.token,
        }
      }
 
    case UPDATE_PAYMENT:
      return { ...state, user: 
        {
          ...state.user,
          paymentToken: action.payload.stripetoken,
          lastfour: action.payload.lastfour
        }
      }
    
    default:
      return state;
  }
};
