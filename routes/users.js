const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUserById,
} = require('../controllers/users');

router.get(
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
  }),
  getAllUsers
);

router.get(
  '/:id',
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
      // id: Joi.string().alphanum().required(),
      // id: Joi.string().length(24).hex().required(),
      id: Joi.string()
        .regex(/^[A-Fa-f0-9]*/)
        .required(),
    }),
  }),
  getUserById
);

module.exports = router;
