const router = require('express').Router();
const db = require('../../../db/controllers/user.js');
const utils = require('../../utils/cleanGetProfile.js');

// get a user profile (should end up requireing some kind of sessions token or something like this)
router.get('/', (req, res) => {
  const { userid } = req.query;
  db.getProfile(userid, (err, result) => {
    if (err) {
      res.status(400).send(err.detail);
    } else {
      utils.cleanGetProfile(result, (cleanedResult) => {
        res.status(200).send(cleanedResult);
      });
    }
  });
});

router.post('/create', (req, res) => {
  const newUserInfo = req.body;

  db.addNewUser(newUserInfo, (err, result) => {
    if (err) {
      res.status(401).send(err.detail);
    } else {
      res.status(201).send(result);
    }
  });
});

router.put('/edit', (req, res) => {
  const newProfileDetails = req.body;
  db.editProfileDetails(newProfileDetails, (err, result) => {
    if (err) {
      res.status(401).send(err.detail);
    } else {
      res.status(201).send(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  // require password and username = shouldn't they be authenticated and logged in at this point?
  // include DB query
  const userId = req.params.id;
  db.deleteUser(userId, (err, result) => {
    if (err) {
      res.status(401).send(err.detail);
    } else {
      res.status(200).send(result);
    }
  });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  db.attemptSignIn(email, password, (err, result) => { // will be sent to hashing algo first
    if (err) {
      res.status(404).send(err.detail);
    } else if (result === 'invalid') {
      res.sendStatus(401);
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
