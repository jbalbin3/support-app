import axios from 'axios';

// idk how this is gonna work, this api funch is placeholderish
// (probably we need a session token and auth setup for this do be properly working)

function getProfileApi(userid) {
  return new Promise((resolve, reject) => {
    axios.get('/api/profile', {
      params: { userid }
    })
      .then((profile) => {
        resolve(profile.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export default getProfileApi;
