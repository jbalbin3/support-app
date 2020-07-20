/* eslint-disable object-curly-newline */

import axios from 'axios';

function createProfileApi(email, username, password, location, addiction, connection) {
  console.log(addiction);
  return new Promise((resolve, reject) => {
    axios.post('/api/profile/create', { email, username, password, location, addiction, connection })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}


export default createProfileApi;
