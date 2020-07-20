import axios from 'axios';

function getLocationsApi() {
  return new Promise((resolve, reject) => {
    axios.get('/api/location')
      .then((cities) => {
        resolve(cities.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}


export default getLocationsApi;
