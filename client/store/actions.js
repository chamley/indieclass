import { ADD_MYCLASS } from './actionTypes'
import { TEACHER_ADD_CLASS } from './actionTypes'

export function addMyClass(cls) {
  return ({
    type: ADD_MYCLASS,
    payload: cls
  });
};

export function teacherAddClass(newClass) {
  return ({
    type: TEACHER_ADD_CLASS,
    payload: newClass
  });
};