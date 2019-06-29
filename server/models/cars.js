/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import db from '../config/index';

const createCarsTable = `DROP TABLE IF EXISTS cars CASCADE;
CREATE TABLE IF NOT EXISTS cars(
    id SERIAL PRIMARY KEY,
    owner INT NOT NULL,
    created_on TIMESTAMP,
    state VARCHAR(5) NOT NULL,
    status VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    manufacturer VARCHAR(20) NOT NULL,
    model VARCHAR(20) NOT NULL,
    body_type VARCHAR(20) NOT NULL,
    FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
  )`;

export default async function carsTable() {
  try {
    const create = await db.query(createCarsTable);
  } catch (error) {
    console.log(error);
  }
}
