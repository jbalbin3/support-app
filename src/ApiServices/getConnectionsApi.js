import axios from 'axios';

function getConnectionsApi() {
  return new Promise((resolve, reject) => {
    axios.get('/api/connection')
      .then((connections) => {
        resolve(connections.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export default getConnectionsApi;
