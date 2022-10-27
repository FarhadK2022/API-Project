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
     await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Absolutely stellar!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Awesome, but I am too cheap to stay again.',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Great time, but it is out of my budget.',
        stars: 4,
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Will return with the entire family!',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Phenomenal!!',
        stars: 5,
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
    await queryInterface.bulkDelete('Reviews',{},{})
  }
};
