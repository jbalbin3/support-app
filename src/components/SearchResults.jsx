/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/searchResultsStyles.scss';

function SearchResults({ searchedUsers }) {
  return (
    <div className="search-results-container">
      {searchedUsers.map((user, idx) => {
        return (
          <div key={idx}>
            <div>
              <em>User Name --</em>
              {user.username}
            </div>
            <div>
              <em>City --</em>
              {user.city}
            </div>
            <div>
              <em>Addiction --</em>
              {user.addiction_type}
            </div>
            <div>
              <em>Connection --</em>
              {user.connection_type}
            </div>
            <div>
              <em>First Name --</em>
              {user.firstname}
            </div>
            <div>
              <em>Bio --</em>
              {user.bio}
            </div>
            <div>
              <em>Clean Date --</em>
              {user.clean_date}
            </div>
            <div>
              <em>Last Login --</em>
              {user.last_login}
            </div>
            <div>
              <em>Struggle --</em>
              {user.struggle}
            </div>
          </div>
        );
      })}
    </div>
  );
}

SearchResults.propTypes = {
  searchedUsers: PropTypes.array.isRequired,
};

export default SearchResults;
