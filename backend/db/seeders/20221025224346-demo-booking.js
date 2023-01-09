'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2022-09-09'),
        endDate: new Date('2022-09-15'),
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date('2022-09-11'),
        endDate: new Date('2022-09-16'),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2022-09-30'),
        endDate: new Date('2022-10-02'),
      },
      {
        spotId: 4,
        userId: 2,
        startDate: new Date('2022-10-05'),
        endDate: new Date('2022-10-15'),
      },
      {
        spotId: 5,
        userId: 2,
        startDate: new Date('2022-10-17'),
        endDate: new Date('2022-10-23'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options, {},{})
  }
};
