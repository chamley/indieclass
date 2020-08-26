import { 
  ADD_MYCLASS, 
  REMOVE_MYCLASS, 
  SET_EXPLORE_CLASSES, 
  SET_MYCLASSES, 
  SET_EXPLORE_CATEGORY, 
  SET_CLASS,
  SET_USER,
  TEACHER_ADD_CLASS,
  TEACHER_DELETE_CLASS,
  SET_CATEGORIES ,
  UPDATE_PAYMENT,
  TEACHER_EDIT_PROFILE,
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
    lastfour: '',
    bio:'',
  },
  category_id: null,
  viewClass: null,
}

// localstorage - async storage - check that it works with expo

export const reducer = function (state = initialState, action) {

  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload }

    case TEACHER_ADD_CLASS:
      return {...state, teacherClasses: [...state.teacherClasses, action.payload]};

    case TEACHER_DELETE_CLASS:
      return {...state, teacherClasses: [...state.teacherClasses].filter(classItem=>classItem.class_id != action.payload.class_id)}
      
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
      return { ...state, viewClass: action.payload }

    case SET_USER:
      return { ...state,
        user: {
          ...state.user,  
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          token: action.payload.token,
          paymentToken: action.payload.paymentToken,
          bio:action.payload.bio,
          lastfour:action.payload.lastfour,
        },
      }
 
    case UPDATE_PAYMENT:
      return { 
        ...state, 
        user: {
            ...state.user,
            paymentToken: action.payload.stripetoken,
            lastfour: action.payload.lastfour
          }
      }

    case TEACHER_EDIT_PROFILE:

      return {
        ...state,
        user: {
            ...state.user,
            bio:action.payload
          }
      }

    default:
      return state;
  }
};
