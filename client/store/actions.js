const SERVER_URL = 'http://10.0.2.2:3001';

import {
  ADD_MYCLASS,
  REMOVE_MYCLASS,
  SET_EXPLORE_CLASSES,
  SET_MYCLASSES,
  SET_TEACHERCLASSES,
  SET_EXPLORE_CATEGORY,
  SET_CATEGORIES, 
  SET_CLASS,
  SET_USER,
  TEACHER_ADD_CLASS,
  TEACHER_DELETE_CLASS,  
  UPDATE_PAYMENT,
  TEACHER_EDIT_PROFILE
} from './actionTypes'

export function addMyClass(cls) {
  return {
    type: ADD_MYCLASS,
    payload: cls,
  };
}

export function setTeacherClasses(classes) {
  return {
    type: SET_TEACHERCLASSES,
    payload: classes,
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

export function setMyClasses(classes) {
  return {
    type: SET_MYCLASSES,
    payload: classes,
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

export function getMyClassesDB(accessToken) {
  return function (dispatch) {
    fetch(`${SERVER_URL}/students/${accessToken}`)
      .then((res) => res.json())
      .then((cls) => dispatch(setMyClasses(cls)))
      .catch((err) => console.log(err));
  };
}

export function getTeacherClassesDB(accessToken) {
  return function (dispatch) {
    fetch(`${SERVER_URL}/classes/${accessToken}`)
      .then((res) => res.json())
      .then((classes) => dispatch(setTeacherClasses(classes)))
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
  return function (dispatch) {
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

export function updatePaymentDB(user, stripetoken, lastfour) {
  return function(dispatch) {
    //fake DB call till we get an API
    // send: crediCardToken, user_id, lastfour
    fetch(`${SERVER_URL}/payment/${user}`, {
      method:'POST',
      headers: {
        'content-type':'application/json',
      },
      body:JSON.stringify({
        lastfour:lastfour,
        stripe_token:stripetoken
      })
    })
    .then(dispatch(updatePayment(stripetoken)))
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

export function teacherEditProfileDB(token, description) {
  return function(dispatch) {
    fetch(`${SERVER_URL}/editbio/${token}`, {
      method:'POST',
      headers: {
        'content-type':'application/json',
      },
      body:JSON.stringify({
        bio: description
      })
    })
    .then(dispatch(teacherEditProfile(description)))
    .catch(error => console.log('error updating your profile: ',error))
  }
}

export function teacherEditProfile(description) {
  // console.warn('editing in state redux with', description)
  return {
    type: TEACHER_EDIT_PROFILE,
    payload: description
  }
}
