import axios from 'axios';

function getGendersApi() {
  return new Promise((resolve, reject) => {
    axios.get('/api/gender')
      .then((genders) => {
        resolve(genders.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export default getGendersApi;
