const router = require('express').Router();
const db = require('../../../db/controllers/universalOptions.js');

// get all cities stored in DB
router.get('/', (req, res) => {
  db.availableCities((err, result) => {
    if (err) {
      res.status(400).send(err.detail);
    } else {
      res.status(200).send(result);
    }
  });
});

router.put('/', (req, res) => {
  // require some DB controller
});

module.exports = router;
