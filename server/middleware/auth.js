/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import db from '../config/index';

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

  static async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({
        status: 400,
        error: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.user.id]);
      if (!rows[0]) {
        return res.status(400).send({
          status: 400,
          error: 'The token you provided is invalid',
        });
      }
      req.user = { id: decoded.user.id, email: decoded.user.email };
      return next();
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error,
      });
    }
  }
}
