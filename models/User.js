'use strict';
const sequelize = require('sequelize');
const db = require('../db/db')

const User = db.define('User', {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    field: 'id',
    autoIncrement: true,
    primaryKey: true
  },
  userName: {
    type: sequelize.STRING,
    field: 'user_name',
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    validate: {
      isEmail: true,
    },
    allowNull: false,
    unique: true
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: sequelize.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: sequelize.DATE,
    field: 'updated_at',
  },
})

module.exports = User;