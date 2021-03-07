const Article = require('../models/article');

const BadRequestError = require('../errors/bad-request-err');
const ServerError = require('../errors/server-err');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    // Article.find({})
    .then((articles) => res.send(articles))
    // .then((article) => res.send(article))
    .catch(() => {
      throw new ServerError('An error has occured on the server');
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(
          'Unable to create article. Please try again later.'
        );
      }
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (article && req.user._id.toString() === article.owner.toString()) {
        Article.deleteOne(article).then((deletedArticle) => {
          res.send(deletedArticle);
        });
      } else if (!article) {
        throw new NotFoundError('Article not found.');
      } else {
        throw new AuthError(
          'You need to be the owner of this article to delete it.'
        );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.statusCode === 404) {
        throw new NotFoundError('Article not found.');
      }
      next(err);
    })
    .catch(next);
};
