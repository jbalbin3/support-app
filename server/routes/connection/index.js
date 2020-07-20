const router = require('express').Router();
const db = require('../../../db/controllers/universalOptions.js');


router.get('/', (req, res) => {
  db.availableConnections((err, result) => {
    if (err) {
      res.status(400).send(err.detail);
    } else {
      res.status(200).send(result);
    }
  });
});

router.post('/', (req, res) => {
  // some DB controller to add connection for a given user
});

router.put('/', (req, res) => {
  // some DB controller to edit connections for given user
});

module.exports = router;
