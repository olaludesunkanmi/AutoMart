/* eslint-disable no-multiple-empty-lines */
import { Pool } from 'pg';
import setup from './config';

const env = process.env.NODE_ENV || 'development';
const config = setup[env];

let $db;

if (env === 'production') {
  $db = new Pool({ connectionString: process.env.DATABASE_URL });
} else {
  $db = new Pool(config);
}

const db = $db;

export default db;
