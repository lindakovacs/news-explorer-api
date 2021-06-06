const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  // getAllUsers,
  getUser,
} = require('../controllers/users');

// const { validateId } = require('../middleware/validator');

// router.get('/', auth, getAllUsers);
// router.get('/users/me', auth, validateId, getUser);
router.get('/me', auth, getUser);

module.exports = router;
