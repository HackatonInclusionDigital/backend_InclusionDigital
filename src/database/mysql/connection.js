const mysql = require('mysql2/promise');
const { Config } = require('../../config');

const pool = mysql.createPool({
  host: Config.mysql.host,
  user: Config.mysql.user,
  password: Config.mysql.password,
  database: Config.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
