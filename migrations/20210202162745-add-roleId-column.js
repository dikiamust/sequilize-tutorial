'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'User',
      'roleId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Role',
        key: 'id',
        },
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'User',
      'roleId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Role',
        key: 'id',
        },
      }
    );
  }
};
