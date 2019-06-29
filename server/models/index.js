/* eslint-disable no-console */
import usersTable from './users';
import carsTable from './cars';

const createAllTables = async () => {
  try {
    await usersTable();
    await carsTable();
  } catch (err) {
    console.log(err);
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  createAllTables,
};

require('make-runnable');
