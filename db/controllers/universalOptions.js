const { pool } = require('../index');

module.exports.availableCities = (cb) => {
  pool
    .connect()
    .then((client) => {
      client
        .query(`
          SELECT id, city
          FROM locations
          ORDER BY city ASC
        `)
        .then((results) => {
          client.release();
          cb(null, results.rows);
        })
        .catch((err) => {
          client.release();
          cb(err, null);
        });
    });
};

module.exports.availableAddictions = (cb) => {
  pool
    .connect()
    .then((client) => {
      client
        .query(`
          SELECT DISTINCT addiction_type
          FROM user_profile_addiction
        `)
        .then((results) => {
          client.release();
          results.rows.sort((a, b) => {
            if (a.addiction_type < b.addiction_type) return -1;
            if (a.addiction_type > b.addiction_type) return 1;
            return 0;
          });
          cb(null, results.rows);
        })
        .catch((err) => {
          client.release();
          cb(err, null);
        });
    });
};

module.exports.availableConnections = (cb) => {
  pool
    .connect()
    .then((client) => {
      client
        .query(`
          SELECT DISTINCT connection_type
          FROM user_profile_connection
        `)
        .then((results) => {
          client.release();
          cb(null, results.rows);
        })
        .catch((err) => {
          client.release();
          cb(err, null);
        });
    });
};

module.exports.availableGenders = (cb) => {
  pool
    .connect()
    .then((client) => {
      client
        .query(`
          SELECT DISTINCT gender FROM relationship_option
        `)
        .then((results) => {
          client.release();
          cb(null, results.rows);
        })
        .catch((err) => {
          client.release();
          cb(err, null);
        });
    });
};

module.exports.availableOrientations = (cb) => {
  pool
    .connect()
    .then((client) => {
      client
        .query(`
          SELECT DISTINCT sexual_orientation FROM relationship_option
        `)
        .then((results) => {
          client.release();
          cb(null, results.rows);
        })
        .catch((err) => {
          client.release();
          cb(err, null);
        });
    });
};
