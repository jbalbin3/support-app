/* eslint-disable max-len */
/* eslint-disable no-alert */
import React from 'react';
import '../styles/appStyles.scss';
import 'regenerator-runtime';
import { IconButton, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NavBar from './NavBar';
import Search from './Search';
import Messages from './Messages';
import Friends from './Friends';
import Profile from './Profile';
import SignIn from './SignIn';
import DeleteProfile from './DeleteProfile';
import DeleteProfileConfirm from './DeleteProfileConfirm';
import Settings from './Settings';
import SearchResults from './SearchResults';
import ContactUs from './ContactUs';
import CreateAccount from './CreateAccount';
import ConfirmedCreateAccount from './ConfirmedCreateAccount';
import IncorrectUser from './IncorrectUser';
import deleteProfileApi from '../ApiServices/deleteProfileApi';
import searchUsersApi from '../ApiServices/searchUsersApi';
import getLocationsApi from '../ApiServices/getLocationsApi';
import getConnectionsApi from '../ApiServices/getConnectionsApi';
import getAddictionsApi from '../ApiServices/getAddictionsApi';
import getGendersApi from '../ApiServices/getGendersApi';
import getOrientationsApi from '../ApiServices/getOrientationsApi';
import getProfileApi from '../ApiServices/getProfileApi';

const testUserId = 54;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      focus: 'home',
      numUnread: 4, // will need to get number of unread msgs from api/messages call,
      currUserId: 301, // will need to get user ID during login
      search: {
        city: '',
        addiction: '',
        connection: '',
        username: '',
      },
      searchedUsers: [],
      availableCities: [],
      availableAddictions: [],
      availableConnections: [],
      availableGenders: [],
      availableOrientations: [],
      profileDetails: {},
    };
    this.toPage = this.toPage.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.deleteAProfile = this.deleteAProfile.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.afterSignIn = this.afterSignIn.bind(this);
  }

  componentDidMount() {
    getLocationsApi()
      .then((response) => this.setState({ availableCities: response }))
      .catch((err) => console.log(err));
    getConnectionsApi()
      .then((response) => this.setState({ availableConnections: response }))
      .catch((err) => console.log(err));
    getAddictionsApi()
      .then((response) => this.setState({ availableAddictions: response }))
      .catch((err) => console.log(err));
    getGendersApi()
      .then((response) => this.setState({ availableGenders: response }))
      .catch((err) => console.log(err));
    getOrientationsApi()
      .then((response) => this.setState({ availableOrientations: response }))
      .catch((err) => console.log(err));
    getProfileApi(testUserId)
      .then((response) => {
        this.setState({ profileDetails: response });
      })
      .catch((err) => console.log(err));
  }

  // eslint-disable-next-line camelcase
  afterSignIn({ id, last_login, username }) {
    const lastLogin = new Date(last_login);
    this.setState({
      currUserId: id,
      focus: 'home',
    });

    alert(`Welcome ${username}! Your last sign-in was on ${lastLogin.toLocaleDateString()} at ${lastLogin.toLocaleTimeString()}`);
  }

  toPage(newFocus) {
    this.setState({
      focus: newFocus,
    });
  }

  searchInputChange(e) {
    const { search } = this.state;
    const currentSearch = { ...search };
    currentSearch[e.target.name] = e.target.value;
    this.setState({
      search: currentSearch,
    });
  }

  submitSearch() {
    const { search } = this.state;
    searchUsersApi(search)
      .then((response) => {
        console.log('response', response);
        if (response.length === 0) {
          alert('no match');
          return;
        }
        this.setState({
          searchedUsers: response
        }, () => {
          this.setState({
            focus: 'searchResults'
          });
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  deleteAProfile() {
    const { currUserId } = this.state;
    // make DELETE call to `/api/profile/${currUserId}` to delete profile when endpoint is available
    deleteProfileApi(currUserId)
      .then(() => {
        this.setState({
          focus: 'deleteProfileConfirm',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // eslint-disable-next-line consistent-return
  render() {
    const {
      focus, numUnread, searchedUsers, availableCities,
      availableConnections, availableAddictions, availableGenders,
      availableOrientations, profileDetails,
    } = this.state;
    if (focus === 'home') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <h2>HOMEPAGE</h2>
          <div>
            <IconButton onClick={() => this.toPage('search')}>
              SEARCH
              <SearchIcon />
            </IconButton>
          </div>
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'search') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <Search
            submitSearch={this.submitSearch}
            searchInputChange={this.searchInputChange}
            availableCities={availableCities}
            availableAddictions={availableAddictions}
            availableConnections={availableConnections}
          />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'searchResults') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <SearchResults searchedUsers={searchedUsers} />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'messages') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <Messages />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'profile') {
      if (Object.keys(profileDetails).length > 0) {
        return (
          <div>
            <NavBar toPage={this.toPage} numUnread={numUnread} />
            <Profile
              profileDetails={profileDetails}
              availableCities={availableCities}
              availableGenders={availableGenders}
              availableOrientations={availableOrientations}
            />
            <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
              Contact Us
            </Button>
          </div>
        );
      }
      return <div>... Loading</div>;
    }
    if (focus === 'createAccount') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <CreateAccount toPage={this.toPage} />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'confirmedCreateAccount') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <ConfirmedCreateAccount />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'friends') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <Friends />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'settings') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <Settings />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'signIn') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <SignIn toPage={this.toPage} afterSignIn={this.afterSignIn} />
        </div>
      );
    }
    if (focus === 'incorrectUser') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <IncorrectUser toPage={this.toPage} />
        </div>
      );
    }
    if (focus === 'deleteProfile') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <DeleteProfile toPage={this.toPage} deleteAProfile={this.deleteAProfile} />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'deleteProfileConfirm') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <DeleteProfileConfirm toPage={this.toPage} />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
    if (focus === 'contactUs') {
      return (
        <div>
          <NavBar toPage={this.toPage} numUnread={numUnread} />
          <ContactUs />
          <Button variant="outlined" color="secondary" onClick={() => this.toPage('contactUs')}>
            Contact Us
          </Button>
        </div>
      );
    }
  }
}

export default App;
