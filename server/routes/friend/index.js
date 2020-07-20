const router = require('express').Router();

router.get('/', (req, res) => {
  // some DB controller that gets all friends of current user
});

router.delete('/', (req, res) => {
  // some DB controller that deletes a friend from user's list of friends
});

router.post('/', (req, res) => {
  // some DB controller that adds new friend to user friendlist once recipient accepts
});


module.exports = router;
