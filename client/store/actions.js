const SERVER_URL = 'http://192.168.178.102:3001';

import {
  ADD_MYCLASS,
  REMOVE_MYCLASS,
  SET_EXPLORE_CLASSES,
  SET_MYCLASSES,
  SET_EXPLORE_CATEGORY,
  SET_CATEGORIES, 
  SET_CLASS,
  SET_USER,
  TEACHER_ADD_CLASS,
  TEACHER_DELETE_CLASS,  
  UPDATE_PAYMENT
} from './actionTypes'

export function addMyClass(cls) {
  return {
    type: ADD_MYCLASS,
    payload: cls,
  };
}

export function teacherAddClass(newClass) {
  return {
    type: TEACHER_ADD_CLASS,
    payload: newClass,
  };
}

export function teacherDeleteClass(deletableClass) {
  // console.warn(deletableClass);
  return ({
    type: TEACHER_DELETE_CLASS,
    payload: deletableClass,
  })
}



export function removeMyClass(cls_id) {
  return {
    type: REMOVE_MYCLASS,
    payload: cls_id,
  };
}

export function setMyClasses(cls) {
  return {
    type: SET_MYCLASSES,
    payload: cls,
  };
}

export function setExploreClasses(cls) {
  return {
    type: SET_EXPLORE_CLASSES,
    payload: cls,
  };
}

export function setExploreCategory(category_id) {
  return {
    type: SET_EXPLORE_CATEGORY,
    payload: category_id,
  };
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
}

export function setViewClass(cls) {
  return {
    type: SET_CLASS,
    payload: cls,
  };
}

export function setUser (user) {
  return {
    type: SET_USER,
    payload: user
  }
}

// API calls to database
export function addMyClassDB(accessToken, class_id) {
  return function (dispatch) {
    fetch(`${SERVER_URL}/assignusertoclass/${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ class_id: class_id }),
    })
    .then(res => res.json())
    .then(cls => dispatch(addMyClass(cls)))
    .catch(err => console.log(err))
  }
}

// export function removeMyClassDB(cls_id) {
//   return function(dispatch) {
//     fetch(`${process.env.SERVER_URL}/classes/${cls_id}`)
//     .then(res => res.json())
//     .then(res => dispatch())
//   }
// }

export function getMyClassesDB(accessToken) {
  return function (dispatch) {
    fetch(`${SERVER_URL}/students/${accessToken}`)
      .then((res) => res.json())
      .then((cls) => dispatch(setMyClasses(cls)))
      .catch((err) => console.log(err));
  };
}

export function getExploreClassesDB() {
  return function (dispatch) {
    fetch(`${SERVER_URL}/classes`)
      .then((res) => res.json())
      .then((cls) => dispatch(setExploreClasses(cls)))
      .catch((err) => console.log(err));
  };
}

export function getCategoriesDB() {
  return function (dispatch) {
    fetch(`${SERVER_URL}/categories`)
      .then((res) => res.json())
      .then((cats) => dispatch(setCategories(cats)))
      .catch((err) => console.log(err));
  };
}

export function teacherAddClassDB(cls, token) {
  console.log('the class into create class is', cls)
  console.log('the token into create class is', token)
  return function (dispatch) {
    //check wifi for this value
    // Sebastians-MacBook-Pro-3.local
    //  192.168.178.102
    fetch(`${SERVER_URL}/classes/${token}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(cls),
    })
      .then((res) => res.json())
      .then((cls) => {
        return dispatch(teacherAddClass(cls));
      })
      .catch((err) => console.log(err));
  };
}

export function teacherDeleteClassDB(cls) {
  return function (dispatch) {
    fetch(`${SERVER_URL}/classes/${cls.class_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(cls),
    })
      .then((res) => {
        return dispatch(teacherDeleteClass(cls));
      })
      .catch((err) => console.log(err));
  };
}

export function updatePaymentDB(creditCardToken, user_id, lastfour) {
  return function(dispatch) {
    //fake DB call till we get an API
    // send: crediCardToken, user_id, lastfour
    console.warn('we welcome this creditCardToken into our database as our God');
    new Promise((resolve) => {
      console.log('Credit card token\n', creditCardToken);
      setTimeout(() => {
        resolve({ status: true });
      }, 1000)
    })
    .then(dispatch(updatePayment(creditCardToken)))
    .catch(error => console.log('error: ',error));
  }
}

export function updatePayment(creditCardToken, lastfour) {
  return {
    type: UPDATE_PAYMENT,
    payload:{
      stripetoken: creditCardToken,
      lastfour: lastfour
    }
  }
}
