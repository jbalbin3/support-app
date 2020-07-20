const router = require('express').Router();

router.get('/inbox', (req, res) => {
  // some DB controller that gets messages received by user
});

router.get('/sent', (req, res) => {
  // some DB controller that gets all messages sent by user
});

router.post('/', (req, res) => {
  // some DB controller that post a message from user to some recipient
});

router.delete('/inbox', (req, res) => {
  // some DB controller that deletes a message in user inbox
});

module.exports = router;
