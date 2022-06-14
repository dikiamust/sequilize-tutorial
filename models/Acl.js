'use strict';
const sequelize = require('sequelize');
const db = require('../db/db')

const Acl = db.define('Acl', {
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
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  module: {
    type: sequelize.STRING,
    allowNull: false,
    defaultValue: null,
  },
  action: {
    type: sequelize.TEXT,
    allowNull: false,
    defaultValue: null,
  },
  resource: {
    type: sequelize.TEXT,
    allowNull: false,
    defaultValue: null,
  },
  permission: {
    type: sequelize.TEXT,
    allowNull: false,
    defaultValue: null,
  },
  description: {
    type: sequelize.TEXT,
    allowNull: true,
    defaultValue: null,
  },
})

Acl.associate = (models) => {
  Acl.belongsToMany(models.Role, { 
    through: 'AclRole', foreignKey: 'aclId'
  });
};

module.exports = Acl;