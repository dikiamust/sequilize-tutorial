'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
      },
      salt: Sequelize.STRING,
      photo: Sequelize.TEXT,
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Role',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // we can do this because it is the first migration
    await queryInterface.dropAllTables();
  },
};
