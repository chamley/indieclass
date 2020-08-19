import { ADD_MYCLASS, REMOVE_MYCLASS, SET_EXPLORE_CLASSES, SET_MYCLASSES} from './actionTypes'

export function addMyClass(cls) {
  return {
    type: ADD_MYCLASS,
    payload: cls
  }
}

export function removeMyClass(cls_id) {
  return {
    type: REMOVE_MYCLASS,
    payload: cls_id
  }
}

export function setMyClasses(cls) {
  return {
    type: SET_MYCLASSES,
    payload: cls
  }
}

export function setExploreClasses(cls) {
  return {
    type: SET_EXPLORE_CLASSES,
    payload: cls
  }
}

// API calls to database
export function addMyClassDB(user_id, class_id) {
  return function(dispatch) {
    fetch(`${process.env.SERVER_URL}/assignusertoclass`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({user_id, class_id})
    })
    .then(res => res.json())
    .then(cls => dispatch(setMyClasses(cls)))
  }
}

// export function removeMyClassDB(cls_id) {
//   return function(dispatch) {
//     fetch(`${process.env.SERVER_URL}/classes/${cls_id}`)
//     .then(res => res.json())
//     .then(res => dispatch())
//   }
// }

export function getMyClassesDB(student_id) {
  return function(dispatch) {
    fetch(`${process.env.SERVER_URL}/students/${student_id}`)
    .then(res => res.json())
    .then(cls => dispatch(setMyClasses(cls)))
  }
}

export function getExploreClassesDB() {
  return function(dispatch) {
    fetch(`${process.env.SERVER_URL}/classes`)
    .then(res => res.json())
    .then(cls => dispatch(setExploreClasses(cls)))
  }
}