/* eslint-disable no-console */
import usersTable from './users';
import carsTable from './cars';
import ordersTable from './orders';

const createAllTables = async () => {
  try {
    await usersTable();
    await carsTable();
    await ordersTable();
  } catch (err) {
    console.log(err);
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  createAllTables,
};

require('make-runnable');
