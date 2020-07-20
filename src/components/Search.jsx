/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
import 'regenerator-runtime';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/searchStyles.scss';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';

function Search({ submitSearch, searchInputChange, availableCities, availableConnections, availableAddictions }) {
  const [cityOption, setCityOption] = useState('');
  const [addictionOption, setAddictionOption] = useState('');
  const [connectionOption, setConnectionOption] = useState('');

  const selectCity = async (e) => {
    await searchInputChange(e);
    setCityOption(e.target.value);
  };

  const selectAddiction = async (e) => {
    await searchInputChange(e);
    setAddictionOption(e.target.value);
  };

  const selectConnection = async (e) => {
    await searchInputChange(e);
    setConnectionOption(e.target.value);
  };

  return (
    <div className="search-container">
      <FormControl variant="filled">
        <InputLabel>City</InputLabel>
        <Select value={cityOption} name="city" onChange={(e) => selectCity(e)}>
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
      <FormControl variant="filled">
        <InputLabel>Addiction</InputLabel>
        <Select value={addictionOption} name="addiction" onChange={(e) => selectAddiction(e)}>
          {availableAddictions.map((addiction, idx) => {
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
      <FormControl variant="filled">
        <InputLabel>Connection</InputLabel>
        <Select value={connectionOption} name="connection" onChange={(e) => selectConnection(e)}>
          {availableConnections.map((connection, idx) => {
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
      <div className="divider">OR</div>
      <TextField id="filled-basic" placeholder="User Name" name="username" variant="filled" onChange={(e) => searchInputChange(e)} />
      <Button variant="contained" color="secondary" onClick={() => submitSearch()}>Search</Button>
    </div>
  );
}

Search.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  searchInputChange: PropTypes.func.isRequired,
  availableCities: PropTypes.array.isRequired,
  availableConnections: PropTypes.array.isRequired,
  availableAddictions: PropTypes.array.isRequired
};

export default Search;
