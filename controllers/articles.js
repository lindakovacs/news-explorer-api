const Article = require('../models/article');
const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

const BadRequestError = require('../errors/bad-request-err');
const ServerError = require('../errors/server-err');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
  // Article.find({})
    .then((articles) => res.status(STATUS_CODES.ok).send(articles))
    // .then((articles) => res.send(articles))
    .catch(() => {
      throw new ServerError(ERROR_MESSAGES.internalServer);
    })
    .catch(next);
};

module.exports.addArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    // const { keyword, title, text, date, source, link, image } = req.body;

    // Article.create({
    //   keyword,
    //   title,
    //   text,
    //   date,
    //   source,
    //   link,
    //   image,
    //   owner: req.user._id,
    // })
    // .then((data) => {
    //   const articleData = data.toObj();
    //   const { owner, ...article } = articleData;
    //   res.status(STATUS_CODES.created).send(article);
    // })
    .then((article) => res.status(STATUS_CODES.ok).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(ERROR_MESSAGES.articleBadRequest);
      }
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
    Article.findById(req.params.articleId)
      // Article.findByIdAndRemove(req.params.articleId)
      .select('+owner')
      .then((article) => {
        if (article && req.user._id.toString() === article.owner.toString()) {
          // if (article && req.user._id === article.owner) {
          Article.deleteOne(article).then((deletedArticle) => {
            res.status(STATUS_CODES.ok).send(deletedArticle);
          });
        } else if (!article) {
          throw new NotFoundError(ERROR_MESSAGES.articleNotFound);
        } else {
          throw new AuthError(ERROR_MESSAGES.deleteArticle);
        }
      })
      .catch((err) => {
        // if (err.name === 'CastError') {
        if (err.name === 'CastError' || err.statusCode === 404) {
          throw new NotFoundError(ERROR_MESSAGES.articleNotFound);
        }
        next(err);
      })
      .catch(next);
};
