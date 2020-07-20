/* eslint-disable no-undef */
const router = require('express').Router();
const db = require('../../../db/controllers/search.js');

router.get('/', (req, res) => {
  const {
    city, addiction, connection, username
  } = req.query;

  db.search(city, addiction, connection, username, (err, result) => {
    if (err) {
      res.status(400).send(err.detail);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
