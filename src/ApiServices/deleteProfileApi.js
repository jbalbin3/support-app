import axios from 'axios';

function deleteProfileApi(userid) {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/profile/${userid}`)
      .then((profile) => {
        resolve(profile.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export default deleteProfileApi;
