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
     await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'image10.url',
        preview: false,
      },
      {
        spotId: 2,
        url: 'image11.url',
        preview: false,
      },
      {
        spotId: 3,
        url: 'image12.url',
        preview: false,
      },
      {
        spotId: 4,
        url: 'image13.url',
        preview: false,
      },
      {
        spotId: 5,
        url: 'image14.url',
        preview: false,
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
    await queryInterface.bulkDelete('SpotImages',{},{})
  }
};
