/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import '../styles/createAccountStyles.scss';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button, Grid, TextField, MenuItem, Select, FilledInput, FormControl, InputLabel, InputAdornment, IconButton } from '@material-ui/core';

import createProfileApi from '../ApiServices/createProfileApi';
import getLocationsApi from '../ApiServices/getLocationsApi';
import getAddictionsApi from '../ApiServices/getAddictionsApi';
import getConnectionsApi from '../ApiServices/getConnectionsApi';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: 400,
  },
  width: {
    width: 415
  }
}));

function CreateAccount({ toPage }) {
  const classes = useStyles();
  const [cities, setCities] = useState([]);
  const [addictions, setAddictions] = useState([]);
  const [connections, setConnections] = useState([]);

  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    city: '',
    addiction: '',
    connection: '',
    showPassword: false,
  });

  useEffect(() => {
    getLocationsApi()
      .then((response) => setCities(response))
      .catch((err) => console.log(err.data));
    getAddictionsApi()
      .then((response) => setAddictions(response))
      .catch((err) => console.log(err.data));
    getConnectionsApi()
      .then((response) => setConnections(response))
      .catch((err) => console.log(err.data));
  }, []);

  const selectCity = (e, prop) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const selectAddiction = (e, prop) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const selectConnection = (e, prop) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const clickCreate = () => {
    createProfileApi(
      values.email, values.username, values.password,
      values.city, values.addiction, values.connection
    )
      .then((response) => {
        console.log(response);
        if (response.rowCount === 1) {
          console.log('successfully created account');
          toPage('confirmedCreateAccount');
        }
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleChange = (e, prop) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container">
      <div className="sub-container">
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.width} variant="filled">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="email-input" label="Email" onChange={(e) => handleChange(e, 'email')} />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.width} variant="filled">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="username-input" label="User Name" onChange={(e) => handleChange(e, 'username')} />
            </Grid>
          </Grid>
        </div>
        <form>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="create-account-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={(e) => handleChange(e, 'password')}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
        </form>
        <FormControl variant="filled" className={classes.width}>
          <InputLabel>City</InputLabel>
          <Select value={values.city} name="city" onChange={(e) => selectCity(e, 'city')}>
            {cities.map((city) => {
              return (
                <MenuItem
                  value={city.id}
                  key={city.id}
                >
                  {city.city}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.width}>
          <InputLabel>Addiction</InputLabel>
          <Select value={values.addiction} name="addiction" onChange={(e) => selectAddiction(e, 'addiction')}>
            {addictions.map((addiction, idx) => {
              return (
                <MenuItem
                  value={addiction.addiction_type}
                  key={idx}
                >
                  {addiction.addiction_type}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.width}>
          <InputLabel>Connection</InputLabel>
          <Select value={values.connection} name="connection" onChange={(e) => selectConnection(e, 'connection')}>
            {connections.map((connection, idx) => {
              return (
                <MenuItem
                  value={connection.connection_type}
                  key={idx}
                >
                  {connection.connection_type === 'Relationship' ? 'Looking for a Relationship' : null}
                  {connection.connection_type === 'Friend' ? 'Looking for a Friend' : null}
                  {connection.connection_type === 'BeSponsor' ? 'Looking to Sponsor' : null}
                  {connection.connection_type === 'NeedSponsor' ? 'Looking for a Sponsor' : null}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={() => clickCreate()}>Create Account</Button>
      </div>
    </div>
  );
}

CreateAccount.propTypes = {
  toPage: PropTypes.func.isRequired
};

export default CreateAccount;
