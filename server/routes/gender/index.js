const router = require('express').Router();
const db = require('../../../db/controllers/universalOptions.js');


router.get('/', (req, res) => {
  db.availableGenders((err, result) => {
    if (err) {
      res.status(400).send(err.detail);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
