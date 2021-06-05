const router = require('express').Router();
// const auth = require('../middleware/auth');

const {
  // getAllUsers,
  // getUserById,
  getUser,
} = require('../controllers/users');

// const { validateId } = require('../middleware/validator');

// router.get('/', auth, getAllUsers);
// router.get('/users/me', auth, validateId, getUserById);
// router.get('/users/me', auth, validateId, getUser);
router.get('/users/me', getUser);

module.exports = router;
