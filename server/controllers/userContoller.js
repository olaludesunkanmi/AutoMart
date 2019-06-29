/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../config/index';
import '@babel/polyfill';
import Helper from '../helpers/helpers';

const { generateToken } = Helper;

dotenv.config();

class UserController {
  // signup
  static async signUp(req, res) {
    try {
      const findUser = 'SELECT * FROM users WHERE email = $1';
      const values = req.body.email.toLowerCase();
      const user = await db.query(findUser, [values]);

      if (user.rows[0]) {
        res.status(403).json({
          status: 403,
          error:
            'Sorry the email you have entered already exists in the system, try another one!',
        });
        return;
      }

      const hash = bcrypt.hashSync(req.body.password.trim(), 10);

      const is_admin = req.body.is_admin || false;

      const newUser = {
        email: req.body.email.toLowerCase().trim(),
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
        password: hash,
        address: req.body.address.trim(),
      };
      const insertUser = 'INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const results = await db.query(insertUser, [
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.password,
        newUser.address,
        is_admin,
      ]);

      const {
        id, email, first_name, last_name, address,
      } = results.rows[0];
      const payload = {
        id,
        email,
        first_name,
        last_name,
        address,
        is_admin,
      };
      const token = generateToken(payload);
      res.status(201).json({
        status: 201,
        data: {
          token,
          id,
          first_name,
          last_name,
          email,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  // login
  static async signIn(req, res) {
    try {
      const findUser = 'SELECT * FROM users WHERE email = $1';
      const values = req.body.email.trim().toLowerCase();
      const { rows } = await db.query(findUser, [values]);

      if (!rows[0]) {
        res.status(404).json({
          status: 404,
          error: 'Email is not registered',
        });
        return;
      }

      const password = bcrypt.compareSync(
        req.body.password.trim(),
        rows[0].password,
      );
      if (!password) {
        res.status(404).json({
          status: 404,
          error: 'Incorrect password',
        });
        return;
      }

      const {
        id, email, first_name, last_name, address, is_admin,
      } = rows[0];
      const payload = {
        id,
        email,
        first_name,
        last_name,
        address,
        is_admin,
      };
      const token = generateToken(payload);
      res.status(200).json({
        status: 200,
        data: {
          token,
          id,
          first_name,
          last_name,
          email,
        },
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default UserController;
