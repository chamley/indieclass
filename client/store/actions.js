import { ADD_MYCLASS } from './actionTypes'
import { TEACHER_ADD_CLASS, TEACHER_DELETE_CLASS } from './actionTypes'

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

export function teacherDeleteClass(deletableClass) {
  return ({
    type: TEACHER_DELETE_CLASS,
    payload: deletableClass
  });
};