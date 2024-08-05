const { Sequelize } = require("sequelize");

const database_name = "rumah_sakit";
const username = "root";
const password = "";
const host = "localhost";
const sequelize = new Sequelize(database_name, username, password, {
  host: host,
  dialect: "mysql",
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
