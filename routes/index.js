const router = require('express').Router();

const users = require('./users');
const auth = require('./auth');
const articles = require('./articles');

router.use('/', auth);
router.use('/users', users);
router.use('/articles', articles);

module.exports = router;
