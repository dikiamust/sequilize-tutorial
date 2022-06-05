'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          id: 1,
          user_name: 'user1',
          email: 'user1@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          user_name: 'user2',
          email: 'user2@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          user_name: 'user3',
          email: 'user3@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'Video',
      [
        {
          id: 1,
          name: 'video1ByUser1',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'video2ByUser1',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'video3ByUser2',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Video', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('User', null, bulkDeleteOptions);
  },
};
