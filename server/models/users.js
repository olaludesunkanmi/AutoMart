/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import db from '../config/index';

const createUsersTable = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        address VARCHAR(100) NOT NULL,
        is_admin BOOLEAN NOT NULL
    )`;

export default async function usersTable() {
  try {
    const create = await db.query(createUsersTable);
  } catch (error) {
    console.log(error);
  }
}
