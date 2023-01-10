'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert( options, [
      {
        reviewId: 1,
        url: 'image1.url',
      },
      {
        reviewId: 2,
        url: 'image2.url',
      },
      {
        reviewId: 3,
        url: 'image3.url',
      },
      {
        reviewId: 4,
        url: 'image4.url',
      },
      {
        reviewId: 5,
        url: 'image5.url',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options,{},{})
  }
};
