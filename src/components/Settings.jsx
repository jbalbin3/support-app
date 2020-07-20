import React, { useState } from 'react';
import { Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { red, lightGreen } from '@material-ui/core/colors';
import '../styles/settingsStyles.scss';

const DefSwitch = withStyles({
  switchBase: {
    color: red[500],
    '&$checked': {
      color: lightGreen.A400,
    },
    '&$checked + $track': {
      backgroundColor: lightGreen.A400,
    },
  },
  checked: {},
  track: {},
})(Switch);

function Settings() {
  const [settings, setSettings] = useState({
    firstName: true,
    picture: true,
    bio: true,
    struggle: true,
    location: true,
    addiction: true,
    relationship: true,
    connection: true,
  });
  const toggleSetting = (e) => {
    setSettings({ ...settings, [e.target.name]: !settings[e.target.name] });
  };
  return (
    <div className="settings-container">
      <div>Setting</div>
      <div>Show</div>
      <div>First Name</div>
      <DefSwitch checked={settings.firstName} name="firstName" onChange={(e) => toggleSetting(e)} />
      <div>Picture</div>
      <DefSwitch checked={settings.picture} name="picture" onChange={(e) => toggleSetting(e)} />
      <div>Bio</div>
      <DefSwitch checked={settings.bio} name="bio" onChange={(e) => toggleSetting(e)} />
      <div>Struggle</div>
      <DefSwitch checked={settings.struggle} name="struggle" onChange={(e) => toggleSetting(e)} />
      <div>Location</div>
      <DefSwitch checked={settings.location} name="location" onChange={(e) => toggleSetting(e)} />
      <div>Addiction</div>
      <DefSwitch checked={settings.addiction} name="addiction" onChange={(e) => toggleSetting(e)} />
      <div>Relationship</div>
      <DefSwitch checked={settings.relationship} name="relationship" onChange={(e) => toggleSetting(e)} />
      <div>Connection</div>
      <DefSwitch checked={settings.connection} name="connection" onChange={(e) => toggleSetting(e)} />
    </div>
  );
}

export default Settings;
