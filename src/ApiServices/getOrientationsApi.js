import axios from 'axios';

function getOrientations() {
  return new Promise((resolve, reject) => {
    axios.get('/api/orientation')
      .then((orientations) => {
        resolve(orientations.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default getOrientations;
