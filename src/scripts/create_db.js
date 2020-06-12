const DB = require("../../src/database");
const { exit } = require("process");

/**
 * Create all the tables in the database.
 */
DB.sequelize.sync({ force: true }).then(() => {
  console.log("Dropping and re-sync db.");
  process.exit(0)
});
