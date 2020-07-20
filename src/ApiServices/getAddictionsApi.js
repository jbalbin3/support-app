import axios from 'axios';

function getAddictionsApi() {
  return new Promise((resolve, reject) => {
    axios.get('/api/addiction')
      .then((addictions) => {
        resolve(addictions.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}


export default getAddictionsApi;
