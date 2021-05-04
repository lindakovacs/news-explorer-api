const router = require('express').Router();
const { createUser, login } = require('../controllers/auth');

const { validateCreateUser, validateLogin } = require('../middleware/validator');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

module.exports = router;