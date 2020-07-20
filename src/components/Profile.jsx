/* eslint-disable no-alert */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useReducer } from 'react';
import 'regenerator-runtime';
import 'date-fns';
import '../styles/profileStyles.scss';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Select, MenuItem, InputLabel, TextField, makeStyles,
  FormLabel, FormControl, FormGroup, FormControlLabel,
  FormHelperText, Checkbox, Grid, Button
} from '@material-ui/core';

import submitProfileChangesApi from '../ApiServices/submitProfileChangesApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  bioWidth: {
    width: 600
  },
  dropDown: {
    width: 250
  }
}));

const toggleAddiction = 'toggleAddiction';
const toggleConnection = 'toggleConnection';
const changeCity = 'changeCity';
const changeBio = 'changeBio';
const changeCleanDate = 'changeCleanDate';
const changeStruggle = 'changeStruggle';
const changeGender = 'changeGender';
const changeOrientation = 'changeOrientation';

const reducer = (state, action) => {
  const shallowClone = { ...state };

  if (action.type === toggleAddiction) {
    shallowClone.addictions[action.payload] = !shallowClone.addictions[action.payload];
    return shallowClone;
  }
  if (action.type === toggleConnection) {
    shallowClone.connections[action.payload] = !shallowClone.connections[action.payload];
    return shallowClone;
  }
  if (action.type === changeCity) {
    shallowClone.city = action.payload;
    return shallowClone;
  }
  if (action.type === changeBio) {
    shallowClone.bio = action.payload;
    return shallowClone;
  }
  if (action.type === changeCleanDate) {
    shallowClone.clean_date = action.payload.toGMTString();
    return shallowClone;
  }
  if (action.type === changeStruggle) {
    shallowClone.struggle = action.payload;
    return shallowClone;
  }
  if (action.type === changeGender) {
    shallowClone.gender = action.payload;
    return shallowClone;
  }
  if (action.type === changeOrientation) {
    shallowClone.sexual_orientation = action.payload;
    return shallowClone;
  }
  return state;
};

function Profile({ availableCities, profileDetails, availableGenders, availableOrientations }) {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, profileDetails);

  const handleProfileChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const handleDateChange = (date, type) => {
    dispatch({ type, payload: date });
  };

  const atLeastOneAddiction = () => {
    const { addictions } = state;
    const boolVals = Object.values(addictions);
    for (let i = 0; i < boolVals.length; i++) {
      if (boolVals[i] === true) return true;
    }
    return false;
  };

  const atLeastOneConnection = () => {
    const { connections } = state;
    const boolVals = Object.values(connections);
    for (let i = 0; i < boolVals.length; i++) {
      if (boolVals[i] === true) return true;
    }
    return false;
  };

  const handleSubmit = () => {
    const oneOrMoreAddictions = atLeastOneAddiction();
    const oneOrMoreConnections = atLeastOneConnection();
    if (oneOrMoreAddictions && oneOrMoreConnections) {
      submitProfileChangesApi(state)
        .then(() => {
          console.log('successful profile edit');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!oneOrMoreAddictions && oneOrMoreConnections) {
      alert('at least one addiction must be selected');
    } else if (oneOrMoreAddictions && !oneOrMoreConnections) {
      alert('at least one connection must be selected');
    } else {
      alert('at least one addiction and connection must be selected');
    }
  };

  const { addictions, connections } = state;
  return (
    <div>
      <div className="profile-details-container">
        <div>
          <h3>{profileDetails.username}</h3>
          <img src={profileDetails.picture_url} alt="nothing" />
        </div>
        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Addictions</FormLabel>
            <FormGroup>
              {Object.keys(addictions).map((key, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={<Checkbox checked={addictions[key]} value={key} name={toggleAddiction} onChange={(e) => handleProfileChange(e)} />}
                    label={key}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>select at least one</FormHelperText>
          </FormControl>
        </div>
        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Looking for a ...</FormLabel>
            <FormGroup>
              {Object.keys(connections).map((key, i) => {
                let label = null;
                if (key === 'BeSponsor') label = 'Sponsee';
                else if (key === 'NeedSponsor') label = 'Sponsor';
                else label = key;
                return (
                  <FormControlLabel
                    key={i}
                    control={<Checkbox checked={connections[key]} value={key} name={toggleConnection} onChange={(e) => handleProfileChange(e)} />}
                    label={label}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>select one at least one</FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" className={classes.dropDown}>
            <InputLabel>City</InputLabel>
            <Select value={state.city} name={changeCity} onChange={(e) => handleProfileChange(e)}>
              {availableCities.map((city) => {
                return (
                  <MenuItem
                    value={city.city}
                    key={city.id}
                  >
                    {city.city}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="bio">
          <TextField
            className={classes.bioWidth}
            id="filled-multiline-static"
            label="Bio"
            name={changeBio}
            multiline
            fullWidth
            rows={5}
            defaultValue={state.bio}
            variant="filled"
            onChange={(e) => handleProfileChange(e)}
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                className={classes.dropDown}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Clean Date"
                value={state.clean_date}
                name="whatever name"
                onChange={(date) => handleDateChange(date, changeCleanDate)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <div className="struggle">
          <TextField
            className={classes.bioWidth}
            id="filled-multiline-static"
            label="Struggle"
            name={changeStruggle}
            multiline
            fullWidth
            rows={5}
            defaultValue={state.struggle}
            variant="filled"
            onChange={(e) => handleProfileChange(e)}
          />
        </div>
        <div>
          <FormControl variant="filled" className={classes.dropDown}>
            <InputLabel>Gender</InputLabel>
            <Select value={state.gender} name={changeGender} onChange={(e) => handleProfileChange(e)}>
              {availableGenders.map((gender, i) => {
                return (
                  <MenuItem
                    value={gender.gender}
                    key={i}
                  >
                    {gender.gender}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" className={classes.dropDown}>
            <InputLabel>Sexual Orientation</InputLabel>
            <Select value={state.sexual_orientation} name={changeOrientation} onChange={(e) => handleProfileChange(e)}>
              {availableOrientations.map((orientation, i) => {
                return (
                  <MenuItem
                    value={orientation.sexual_orientation}
                    key={i}
                  >
                    {orientation.sexual_orientation}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="submit-edits">
        <Button variant="contained" color="secondary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  availableCities: PropTypes.array.isRequired,
  availableGenders: PropTypes.array.isRequired,
  availableOrientations: PropTypes.array.isRequired,
  profileDetails: PropTypes.object.isRequired
};

export default Profile;
