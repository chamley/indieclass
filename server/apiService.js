const fetch = require('node-fetch');
require('dotenv').config();

exports.fetchRequest = async (id) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${process.env.SECRET_API_KEY}`;
  return fetch(`${url}`)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => console.log('err:', err));
};
