/* eslint-disable no-console */
import usersTable from './users';

const createAllTables = async () => {
  try {
    await usersTable();
  } catch (err) {
    console.log(err);
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  createAllTables,
};

require('make-runnable');
