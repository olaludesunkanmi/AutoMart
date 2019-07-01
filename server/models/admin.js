/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../config/index';

dotenv.config();

const admin = {
  first_name: 'Sunkanmi',
  last_name: 'Nelson',
  email: 'createadmin@yahoo.com',
  password: bcrypt.hashSync(process.env.password, 10),
  address: 'Lagos',
  is_admin: true,
};

const createAdmin = 'INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING';
db.query(createAdmin,
  [
    admin.email,
    admin.first_name,
    admin.last_name,
    admin.password,
    admin.address,
    admin.is_admin,
  ])
  .then(() => {
    console.log('Admin created successfully');
  }).catch((error) => {
    console.log(error);
  });
