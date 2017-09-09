const router = require('express').Router();

const meRouter = require('./me');

router.use('/me', meRouter);
router.use('/google', require('./google'));

module.exports = router;