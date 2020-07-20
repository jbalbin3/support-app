const router = require('express').Router();

router.use('/profile', require('./profile'));

router.use('/location', require('./location'));

router.use('/addiction', require('./addiction'));

router.use('/connection', require('./connection'));

router.use('/message', require('./message'));

router.use('/friend', require('./friend'));

router.use('/search', require('./search'));

router.use('/gender', require('./gender'));

router.use('/orientation', require('./orientation'));

module.exports = router;
