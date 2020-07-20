import axios from 'axios';

function searchUsersApi(search) {
  return new Promise((resolve, reject) => {
    axios.get('/api/search', {
      params: search
    })
      .then((users) => {
        resolve(users.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export default searchUsersApi;
