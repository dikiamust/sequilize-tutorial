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
  name: {
    type: sequelize.STRING,
    field: 'name',
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
  roleId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Role',
      key: 'id',
    },
  },
  salt: sequelize.STRING,
  photo: sequelize.TEXT,
  createdAt: {
    type: sequelize.DATE,
  },
  updatedAt: {
    type: sequelize.DATE,
  },
})

User.associate = function(models) {
  User.belongsTo(models.Role, {
    foreignKey: 'roleId',
  });
};

module.exports = User;