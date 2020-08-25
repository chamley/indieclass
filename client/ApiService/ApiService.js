/*
Comments:

We keep the API functions that interface with the server in this file

//TODO

fetch classes by userID for 'MyClasses' screen

fetch classes by userID for 'Teacher Classes' screen

post class (by userID) for 'Create Class' screen
*/

const BASE_URL = 'http://10.0.2.2:3001';

export const getTeacher = async (teacherId) => {
  return fetch(`${BASE_URL}/users`)
    .then((res) => res.json())
    .then(res=>res.filter(res.user_id==teacherId))
    .catch((err) => console.log(err));
};