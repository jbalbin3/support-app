/* eslint-disable camelcase */
const { pool } = require('../index');

module.exports.attemptSignIn = (email, password, cb) => {
  pool
    .connect()
    .then((client) => {
      client
        .query(`
          SELECT
            id,
            username,
            last_login
          FROM
            user_profile
          WHERE user_profile.email = $1
          AND user_profile.password = $2
        `, [email, password])
        .then((results) => {
          if (!results.rows.length) {
            client.release();
            cb(null, 'invalid');
          } else {
            client
              .query(`
                UPDATE ONLY
                  user_profile
                SET
                  last_login = TO_TIMESTAMP($1)
                WHERE
                  id = $2
              `, [(Date.now() / 1000), results.rows[0].id])
              .then(() => {
                client.release();
                cb(null, results.rows);
              });
          }
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
          cb(err, null);
        });
    });
};


module.exports.getProfile = (userId, cb) => {
  pool
    .query(`
      WITH user_info AS (
        SELECT
          id, email, username, firstname,
          created_on, last_login, location,
          picture_url, bio, struggle, clean_date
        FROM user_profile
        WHERE id = $1
      ), addiction AS (
        SELECT
          addiction_type
        FROM user_profile_addiction
        WHERE user_profile_id = $1
      ), connection as (
        SELECT
        connection_type, relationship_option
        FROM user_profile_connection
        WHERE user_profile_id = $1
      ), city_name as (
        SELECT
          city
        FROM locations
        WHERE id = (SELECT location FROM user_info)
      ), relationship_info as (
        SELECT
          gender, sexual_orientation
        FROM relationship_option
        WHERE id in (select relationship_option FROM connection)
      ), all_addictions as (
        SELECT DISTINCT addiction_type AS available_addictions
        FROM user_profile_addiction
      ), all_connections as (
        SELECT DISTINCT connection_type AS available_connections
        FROM user_profile_connection
      )
      SELECT * FROM user_info, addiction, connection, city_name, relationship_info, all_addictions, all_connections;
    `, [userId])
    .then((results) => {
      cb(null, results.rows);
    })
    .catch((err) => {
      console.log(err.stack);
      cb(err, null);
    });
};


module.exports.editProfileDetails = (newProfileDetails, cb) => {
  const {
    id,
    struggle,
    bio,
    city,
    clean_date,
    addictions,
    connections,
    gender,
    sexual_orientation,

  } = newProfileDetails;

  function arrToStringObject(arr) {
    let str = JSON.stringify(arr);
    str = str.slice(1, str.length - 1);
    str = `{${str}}`;
    return str;
  }

  let filteredAddictions = Object.keys(addictions).filter((addiction) => {
    return addictions[addiction] === true;
  });

  let filteredConnections = Object.keys(connections).filter((connection) => {
    return connections[connection] === true;
  });

  filteredAddictions = arrToStringObject(filteredAddictions);
  filteredConnections = arrToStringObject(filteredConnections);

  pool
    .query(`
      WITH addictions_deleted AS (
        DELETE
        FROM user_profile_addiction
        WHERE user_profile_id = $1
    ), addictions_inserted AS (
        INSERT
        INTO user_profile_addiction (user_profile_id, addiction_type)
        SELECT $1, UNNEST ($2::addiction_type[])
    ), connections_deleted AS (
        DELETE
        FROM user_profile_connection
        WHERE user_profile_id = $1
    ), connections_inserted AS (
        INSERT
        INTO user_profile_connection (user_profile_id, connection_type, relationship_option)
        SELECT $1, UNNEST ($3::connection_type[]), $1
    ), relationship AS (
        UPDATE relationship_option
        SET gender = $4, sexual_orientation = $5
        WHERE id = $1
    )
    UPDATE user_profile
    SET
      location = (SELECT id FROM locations WHERE city = $6),
      bio = $7,
      struggle = $8,
      clean_date = $9
    WHERE user_profile.id = $1
    `, [id, filteredAddictions, filteredConnections, gender, sexual_orientation, city, bio, struggle, clean_date])
    .then((results) => {
      cb(null, results);
    })
    .catch((err) => {
      console.log(err.stack);
      cb(err, null);
    });
};


// adds a new user
module.exports.addNewUser = (newUserInfo, cb) => {
  const {
    email,
    username,
    password,
    firstname = null,
    picture_url = null,
    bio = null,
    struggle = null,
    location = null,
    addiction = null,
    connection = null,
    clean_time = null,
  } = newUserInfo;

  pool
    .connect()
    .then((client) => {
      client
        .query(`
          WITH new_user_id AS (
            INSERT INTO user_profile
              (
                email,
                username,
                firstname,
                password,
                created_on,
                picture_url,
                bio,
                struggle,
                location,
                clean_date,
                last_login
              )
            VALUES
              (
                $1,
                $2,
                $3,
                $4,
                TO_TIMESTAMP($5),
                $6,
                $7,
                $8,
                $9,
                $10,
                TO_TIMESTAMP($11)
              )
              RETURNING user_profile.id
          ), new_addiction AS (
              INSERT INTO user_profile_addiction
                (
                  user_profile_id,
                  addiction_type
                )
              VALUES
                (
                  (select * from new_user_id),
                  $12
                )
          )
          INSERT INTO user_profile_connection
            (
              user_profile_id,
              connection_type
            )
          VALUES
            (
              (select * from new_user_id),
              $13
            );
        `, [email, username, firstname, password, Date.now(), picture_url, bio, struggle, location, clean_time, Date.now(), addiction, connection])
        .then((results) => {
          client.release();
          cb(null, results);
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
          cb(err, null);
        });
    });
};

module.exports.deleteUser = (userId, cb) => {
  pool
    .connect()
    .then((client) => {
      client
        .query(`
          DELETE FROM user_profile
          WHERE id = $1;
        `, [userId])
        .then((results) => {
          client.release();
          cb(null, results.rows);
        })
        .catch((err) => {
          client.release();
          cb(err, null);
        });
    })
    .catch((err) => {
      cb(err, null);
    });
};
