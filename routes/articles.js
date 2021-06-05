const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const { validateId, validateCreateArticle } = require('../middleware/validator');

router.get('/', auth, getArticles);
router.post('/', auth, validateCreateArticle, createArticle);
router.delete('/:articleId', auth, validateId, deleteArticle);

module.exports = router;
