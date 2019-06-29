/* eslint-disable no-console */

const Joi = require('joi');

export default class Auth {
  static validate(req, res, next) {
    const schema = {
      first_name: Joi.string()
        .trim()
        .required()
        .min(2)
        .regex(/^[a-zA-Z]+/),
      last_name: Joi.string()
        .trim()
        .required()
        .min(2)
        .regex(/^[a-zA-Z]+/),
      email: Joi.string()
        .email()
        .trim()
        .required(),
      password: Joi.string()
        .trim()
        .min(8)
        .required(),
      address: Joi.string()
        .trim()
        .required(),
      is_admin: Joi.boolean().required(),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    return next();
  }

  static loginValidator(req, res, next) {
    const schema = {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    return next();
  }
}
