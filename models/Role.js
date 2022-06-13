'use strict';
const sequelize = require('sequelize');
const db = require('../db/db')

const Role = db.define('Role', {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: sequelize.DATE,
  },
  updatedAt: {
    type: sequelize.DATE,
  },
})

module.exports = Role;