const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  getArticles,
  addArticle,
  deleteArticle,
} = require('../controllers/articles');

// const { validateId, validateCreateArticle } = require('../middleware/validator');

router.get('/', auth, getArticles);
router.post('/', auth, addArticle);
router.delete('/:articleId', auth, deleteArticle);

// router.post("/", auth, getArticles);
// router.post("/", auth, validateCreateArticle, addArticle);
// router.delete('/:articleId', auth, validateId, deleteArticle);

module.exports = router;
