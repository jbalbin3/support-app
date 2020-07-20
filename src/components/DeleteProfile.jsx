import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function DeleteProfile({ toPage, deleteAProfile }) {
  return (
    <div>
      <h2>DELETE MY PROFILE</h2>
      <p>Are you sure?</p>
      <p>This cannot be undone!</p>
      <p>Why would you like to delete your profile?</p>
      <input type="textbox" />
      {/* can add padding when styking is applied instead of line breaks */}
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={() => toPage('home')}>
        Changed my mind
      </Button>
      <br />
      <br />
      <Button variant="contained" color="secondary" onClick={() => deleteAProfile()}>
        DeleteProfile
      </Button>
    </div>
  );
}

DeleteProfile.propTypes = {
  toPage: PropTypes.func.isRequired,
  deleteAProfile: PropTypes.func.isRequired,
};
export default DeleteProfile;
