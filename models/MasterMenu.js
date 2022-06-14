'use strict';
const sequelize = require('sequelize');
const db = require('../db/db')

const MasterMenu = db.define('MasterMenu', {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  icon: {
    type: sequelize.STRING,
    defaultValue: ' ',
  },
  path: {
    type: sequelize.STRING,
    defaultValue: ' ',
  },
  type: {
    type: sequelize.STRING,
    defaultValue: ' ',
  },
  abstract: {
    type: sequelize.BOOLEAN,
    defaultValue: false,
  },
  order: {
    type: sequelize.INTEGER,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    type: sequelize.DATE,
  },
  updatedAt: {
    type: sequelize.DATE,
  },
})

MasterMenu.associate = (models) => {
  MasterMenu.belongsTo(models.MasterMenu, {
    as: 'parentMenu',
    foreignKey: 'parentId',
    useJunctionTable: false,
  });
  MasterMenu.belongsToMany(models.Role, {
    through: 'RoleMenu',
    foreignKey: 'menuId',
  });
  MasterMenu.hasMany(models.Acl);
};

module.exports = MasterMenu;