/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
import db from '../config/index';

const createOrdersTable = `DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    buyer INT NOT NULL,
    car_id INT NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id) ON DELETE CASCADE
  )`;

export default async function ordersTable() {
  try {
    const create = await db.query(createOrdersTable);
  } catch (error) {
    console.log(error);
  }
}
