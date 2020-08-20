const SERVER_URL = process.env.REACT_APP_SERVER_URL
import { ADD_MYCLASS, REMOVE_MYCLASS, SET_EXPLORE_CLASSES, SET_MYCLASSES, SET_EXPLORE_CATEGORY } from './actionTypes'

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

export function setExploreCategory(category_id) {
  return {
    type: SET_EXPLORE_CATEGORY,
    payload: category_id
  }
}

// API calls to database
export function addMyClassDB(user_id, class_id) {
  return function(dispatch) {
    fetch(`http://10.0.2.2:3001/assignusertoclass`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({user_id, class_id})
    })
    .then(res => res.json())
    .then(cls => dispatch(addMyClass(cls)))
    .catch(err=>console.log(err))
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
    fetch(`http://10.0.2.2:3001/students/${student_id}`)
    .then(res => res.json())
    .then(cls => dispatch(setMyClasses(cls)))
    .catch(err=>console.log(err))
  }
}

export function getExploreClassesDB() {
  console.log('into getExploreClassesDB')
  return function(dispatch) {
    console.log('into getExploreClassesDB dispatch')
    fetch('http://10.0.2.2:3001/classes')
    .then(res => res.json())
    .then(res => {
      console.log('res in getExploreClassesDB', res)
      return res
    })
    .then(cls => dispatch(setExploreClasses(cls)))
    .catch(err=>console.log(err))
  }
}