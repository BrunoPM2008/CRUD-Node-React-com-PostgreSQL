const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud_node',
  password: 'PostP4ssworld',
  port: 5432,
});

module.exports = pool;