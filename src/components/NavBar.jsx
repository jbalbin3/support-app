import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  nav: {
    marginLeft: theme.spacing(2),
    color: 'inherit',
  },
}));

function NavBar({ toPage, numUnread }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton className={classes.nav} onClick={() => toPage('home')}>
        <HomeIcon />
      </IconButton>
      <IconButton className={classes.nav} onClick={() => toPage('search')}>
        <SearchIcon />
      </IconButton>
      <IconButton className={classes.nav} onClick={() => toPage('messages')}>
        <Badge badgeContent={numUnread} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" className={classes.nav} onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => toPage('profile')}>Profile</MenuItem>
        <MenuItem onClick={() => toPage('friends')}>Friends</MenuItem>
        <MenuItem onClick={() => toPage('settings')}>Settings</MenuItem>
        <MenuItem onClick={() => toPage('createAccount')}>Create Account</MenuItem>
        <MenuItem onClick={() => toPage('deleteProfile')}>Delete Account</MenuItem>
        <MenuItem onClick={() => toPage('signIn')}>Sign-In</MenuItem>
      </Menu>
    </div>
  );
}

NavBar.propTypes = {
  toPage: PropTypes.func.isRequired,
  numUnread: PropTypes.number.isRequired,
};

export default NavBar;
