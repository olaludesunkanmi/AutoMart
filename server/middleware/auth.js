import users from '../models/userDb';

const Joi = require('joi');

export default class Auth {
  static validate(req, res, next) {
    const schema = {
      firstname: Joi.string()
        .trim()
        .required()
        .min(2)
        .regex(/^[a-zA-Z]+/),
      lastname: Joi.string()
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
      isAdmin: Joi.boolean().required(),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    const user = users.find(e => e.email === req.body.email);
    if (user) {
      return res
        .status(405)
        .json({ status: 405, error: 'The email is already registered' });
    }
    return next();
  }
}
