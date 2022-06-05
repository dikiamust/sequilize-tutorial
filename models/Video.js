'use strict';
const sequelize = require('sequelize');
const db = require('../db/db')

const Video = db.define('Video', {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    field: 'id',
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: sequelize.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'User',
      key: 'id',
    },
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

Video.associate = function(models) {
  Video.hasOne(models.User, {
    foreignKey: 'user_id',
  });
};

module.exports = Video;