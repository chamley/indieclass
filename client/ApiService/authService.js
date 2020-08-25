const BASE_URL = 'http://192.168.178.102:3001';

const apiServiceJWT = {};

apiServiceJWT.profile = (accessToken) => {
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then(res=>{
      console.log('front end on signin response value', res);
      return res
    })
    .catch((err) => console.log(err));
};

export default apiServiceJWT;
