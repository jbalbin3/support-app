import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function DeleteProfileConfirm({ toPage }) {
  return (
    <div>
      <p>Your profile has been deleted.</p>
      <p>Thank you for using our site. You’re welcome back anytime.</p>
      <Button variant="contained" color="primary" onClick={() => toPage('home')}>
        Home
      </Button>
    </div>
  );
}

DeleteProfileConfirm.propTypes = {
  toPage: PropTypes.func.isRequired,
};
export default DeleteProfileConfirm;
