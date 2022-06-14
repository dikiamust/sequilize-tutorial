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
    type: sequelize.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please input a name',
      },
    },
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: {
      msg: 'This email is already taken.',
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'Email format is invalid',
      },
      notEmpty: true,
    },
    set(val) {
      this.setDataValue('email', val.toLowerCase());
    },
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

User.associate = (models) => {
  User.belongsTo(models.Role, {
    foreignKey: 'roleId',
  });
};

module.exports = User;