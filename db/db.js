const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

const databaseInit = new Sequelize({
  dialect: "postgres",
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  define: {
    freezeTableName: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

module.exports = databaseInit;

databaseInit
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Errr :", err));

/*
options.underscored - Converts all camelCased columns to underscored if true
options.underscoredAll - Converts camelCased model names to underscored table names if true
*/
