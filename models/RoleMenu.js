'use strict';
const sequelize = require('sequelize');
const db = require('../db/db')

const RoleMenu = db.define('RoleMenu', {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  createdAt: {
    type: sequelize.DATE,
  },
  updatedAt: {
    type: sequelize.DATE,
  },
})

module.exports = RoleMenu;