
import { TEACHER_ADD_CLASS, TEACHER_DELETE_CLASS } from './actionTypes'


export function teacherAddClass(newClass) {
  return ({
    type: TEACHER_ADD_CLASS,
    payload: newClass
  });
};

export function teacherDeleteClass(deletableClass) {
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
  console.warn(cls);
  return function(dispatch) {
    fetch(`http://192.168.178.102:3001/classes/:classid`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(cls)
    })
    .then((res) => {
      console.warn(res);
      return dispatch(teacherDeleteClass(cls));
    })
    .catch( err=> console.log(err))
  }
}


// }
// {
//   "classname":"How to make toast 3",
//   "classtime":"2019-02-08 04:05:06",
//   "classlength":"72",
//   "place_id":"abc_789",
//   "signedup":0,
//   "limit":10,
//   "cost": 1599,
//   "description":"With bread and a toaster, because we're moving up in the world",
//   "category_id":"f350a8b1-e1f8-11ea-bd67-f333cd1f538c",
//   "teacher_id":"f350cfc1-e1f8-11ea-bd67-f333cd1f538c"
// }