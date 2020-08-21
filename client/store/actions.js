
import { TEACHER_ADD_CLASS, TEACHER_DELETE_CLASS } from './actionTypes'


export function teacherAddClass(newClass) {
  return ({
    type: TEACHER_ADD_CLASS,
    payload: newClass
  });
};

export function teacherDeleteClass(deletableClass) {
  console.warn(deletableClass);
  return ({
    type: TEACHER_DELETE_CLASS,
    payload: deletableClass
  });
};

export function teacherAddClassDB(cls) {
  return function(dispatch) {
    
    //check wifi for this value
    // Sebastians-MacBook-Pro-3.local
    //  192.168.178.102
    fetch(`http://192.168.178.102:3001/classes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(cls)
    })
    .then(res => res.json())
    .then(cls => {
      return dispatch(teacherAddClass(cls));
    })
    .catch(err => console.log(err))
  }
}

export function teacherDeleteClassDB(cls) {

  return function(dispatch) {
    fetch(`http://192.168.178.102:3001/classes/${cls.class_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(cls)
    })
    .then((res) => {


      return dispatch(teacherDeleteClass(cls));
    })
    .catch( err => console.log(err) )
  }
}

