const router = require('express').Router();
const db = require('../../../db/controllers/universalOptions.js');

router.get('/', (req, res) => {
  db.availableAddictions((err, result) => {
    if (err) {
      res.status(400).send(err.detail);
    } else {
      res.status(200).send(result);
    }
  });
});

router.post('/', (req, res) => {
  // some DB controller to add an addiction for user
});

router.delete('/', (req, res) => {
  // some DB controller to delete a user addiction
});

module.exports = router;
