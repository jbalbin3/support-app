import axios from 'axios';


function submitProfileChangesApi(newProfileDetails) {
  return new Promise((resolve, reject) => {
    axios.put('/api/profile/edit', newProfileDetails)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export default submitProfileChangesApi;
