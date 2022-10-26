'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-09-09',
        endDate: '2022-09-15',
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2022-09-11',
        endDate: '2022-09-16',
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2022-09-30',
        endDate: '2022-10-02',
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2022-10-05',
        endDate: '2022-10-15',
      },
      {
        spotId: 5,
        userId: 2,
        startDate: '2022-10-17',
        endDate: '2022-10-23',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings',{},{})
  }
};
