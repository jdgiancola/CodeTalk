const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  const url = process.env.JAWSDB_URL;
  const match = url.match(/mysql:\/\/(.*):(.*)@(.*):(\d*)\/(.*)/);

  sequelize = new Sequelize(match[5], match[1], match[2], {
    host: match[3],
    port: match[4],
    dialect: 'mysql',
    dialectOptions: {
      ssl: 'Amazon RDS'
    },
    // Additional options for production environment...
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      // Additional options for development environment...
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

module.exports = sequelize;
