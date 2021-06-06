const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getUser,
} = require('../controllers/users');

// const { validateId } = require('../middleware/validator');

// router.get('/users/me', auth, validateId, getUser);
router.get('/me', auth, getUser);

module.exports = router;
