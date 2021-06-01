const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getAllUsers,
  getUserById,
} = require('../controllers/users');

const { validateId } = require('../middleware/validator');

router.get('/', auth, getAllUsers);
router.get('/me', auth, validateId, getUserById);

module.exports = router;
