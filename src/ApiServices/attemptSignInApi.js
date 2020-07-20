import axios from 'axios';

function attemptSignInApi(email, password) {
  return axios.post('/api/profile/signin', { email, password })
    .then((response) => response.data[0]);
}

export default attemptSignInApi;
