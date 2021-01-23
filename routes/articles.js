const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', getAllArticles);

router.post(
  '/',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .options({ allowUnknown: true }),
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.date().iso().required(),
      // link: Joi.string().required().uri(),
      link: Joi.string()
        .required()
        // .uri({ scheme: ['http', 'https'] }),
        // eslint-disable-next-line no-useless-escape
        .pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
      // image: Joi.string().required().uri(),
      image: Joi.string()
        .required()
        // .uri({ scheme: ['http', 'https'] }),
        // eslint-disable-next-line no-useless-escape
        .pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
      source: Joi.string().required(),
    }),
  }),
  createArticle
);

router.delete(
  '/:articleId',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .options({ allowUnknown: true }),
    params: Joi.object().keys({
      // articleId: Joi.string().alphanum().required(),
      articleId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteArticle
);

module.exports = router;
