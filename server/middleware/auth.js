import users from '../models/userDb';

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
    // Check if the entered email exists
    const foundUser = users.find(e => e.email === req.body.email);
    //   if user doesn't exist
    if (!foundUser) {
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    }

    // Check if the entered password is correct
    const password = users.find(p => p.password === req.body.password);
    //   if password is Incorrect
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Incorrect password',
      });
    }
    req.body.foundUser = foundUser;
    req.body.password = password;
    return next();
  }
}
