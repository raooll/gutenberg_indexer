const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config").DB_CONFIG;

/**
 * Create the db object and connect to it.
 */
const sequelize = new Sequelize(
  DB_CONFIG.DATABASE,
  DB_CONFIG.USERNAME,
  DB_CONFIG.PASSWORD,
  {
    host: DB_CONFIG.HOST,
    dialect: DB_CONFIG.dialect,
    logging: false,
    pool: {
      max: DB_CONFIG.pool.max,
      min: DB_CONFIG.pool.min,
      acquire: DB_CONFIG.pool.acquire,
      idle: DB_CONFIG.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.BookInfo = require("./models/book_info.js")(sequelize, Sequelize);

module.exports = db;
