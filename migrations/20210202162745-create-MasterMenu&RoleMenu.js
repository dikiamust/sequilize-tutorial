'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MasterMenu', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      icon: {
        type: Sequelize.STRING,
        defaultValue: ' ',
      },
      path: {
        type: Sequelize.STRING,
        defaultValue: ' ',
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: ' ',
      },
      abstract: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      order: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true,
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

    await queryInterface.createTable('RoleMenu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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

