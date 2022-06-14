'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'AclRole',
      'aclId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Acl',
        key: 'id',
        },
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'AclRole',
      'aclId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Acl',
        key: 'id',
        },
      }
    );
  }
};
