/* eslint-disable no-else-return */
const { pool } = require('../index');

module.exports.search = (city, addiction, connection, username, cb) => {
  if (username.length > 0) {
    pool
      .connect()
      .then((client) => {
        client
          .query(`
            SELECT
              user_profile.id,
              user_profile.username,
              user_profile.firstname,
              user_profile.created_on,
              user_profile.last_login,
              user_profile.picture_url,
              user_profile.bio,
              user_profile.struggle,
              user_profile.location,
              user_profile.clean_date,
              locations.city,
              user_profile_addiction.addiction_type,
              user_profile_connection.connection_type
            FROM user_profile
            INNER JOIN locations
            ON locations.id = user_profile.location
            INNER JOIN user_profile_addiction
            ON user_profile_addiction.user_profile_id = user_profile.id
            INNER JOIN user_profile_connection
            ON user_profile_connection.user_profile_id = user_profile.id
            WHERE user_profile.username = $1
          `, [username])
          .then((results) => {
            client.release();
            cb(null, results.rows);
          })
          .catch((err) => {
            client.release();
            cb(err, null);
          });
      });
  } else {
    pool
      .connect()
      .then((client) => {
        client
          .query(`
            SELECT
              user_profile.id,
              user_profile.username,
              user_profile.firstname,
              user_profile.created_on,
              user_profile.last_login,
              user_profile.picture_url,
              user_profile.bio,
              user_profile.struggle,
              user_profile.location,
              user_profile.clean_date,
              locations.city,
              user_profile_addiction.addiction_type,
              user_profile_connection.connection_type
            FROM user_profile
            INNER JOIN locations
            ON locations.id = user_profile.location
            INNER JOIN user_profile_addiction
            ON user_profile_addiction.user_profile_id = user_profile.id
            INNER JOIN user_profile_connection
            ON user_profile_connection.user_profile_id = user_profile.id
            WHERE locations.city = $1
            AND user_profile_addiction.addiction_type = $2
            AND user_profile_connection.connection_type = $3
          `, [city, addiction, connection])
          .then((results) => {
            client.release();
            cb(null, results.rows);
          })
          .catch((err) => {
            client.release();
            cb(err, null);
          });
      });
  }
};
