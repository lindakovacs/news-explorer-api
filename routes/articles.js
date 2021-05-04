const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const { validateId, validateCreateArticle } = require('../middleware/validator');

router.get('/', auth, getAllArticles);
router.post('/', auth, validateCreateArticle, createArticle);
router.delete('/:id', auth, validateId, deleteArticle);

module.exports = router;
