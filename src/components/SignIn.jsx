import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  InputLabel,
} from '@material-ui/core';
import attemptSignInAPI from '../ApiServices/attemptSignInApi';

function SignIn({ toPage, afterSignIn }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const attemptLogin = (event) => {
    event.preventDefault();
    // if (event.target.isValid()) console.log('valid');
    attemptSignInAPI(email, password)
      .then((userInfo) => {
        afterSignIn(userInfo);
      }) // a message that they have logged in? or just change the icon?
      .catch((error) => {
        if (error.response.status === 401) {
          toPage('incorrectUser');
        } else {
          alert('Oh no! Something went wrong, please wait then try again.');
        }
      });
  };

  return (
    <form
      className="signIn-container"
      onSubmit={attemptLogin}
    >

      <InputLabel>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="filled"
          type="email"
          required
        />
      </InputLabel>

      <InputLabel>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="filled"
          type="password"
          required
        />
      </InputLabel>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        onSubmit={attemptLogin}
      >
        Sign-In
      </Button>

    </form>
  );
}

SignIn.propTypes = {
  toPage: PropTypes.func.isRequired,
  afterSignIn: PropTypes.func.isRequired,
};

export default SignIn;
