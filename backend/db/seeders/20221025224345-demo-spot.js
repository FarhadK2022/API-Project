'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
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
        ownerId: 3,
        address: '300 Doheny Dr',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        lat: 34.07368,
        lng: -118.38915,
        name: 'Four Seasons',
        description: 'This upscale contemporary hotel is 2.1 miles from the Los Angeles County Museum of Art, and 5 miles from the Hollywood Walk of Fame.',
        price: 700,
      },
      {
        ownerId: 4,
        address: '733 W Knoll Dr',
        city: 'West Hollywood',
        state: 'California',
        country: 'United States of America',
        lat: 34.08482,
        lng: -118.37778,
        name: 'Le Parc',
        description: 'Set on a tree-lined residential street, this relaxed, all-suite hotel is 2 miles from The Grove outdoor mall and 3 miles from the Los Angeles County Museum of Art.',
        price: 250,
      },
      {
        ownerId: 5,
        address: '8555 Beverly Blvd',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        lat: 34.07672,
        lng: -118.37737,
        name: 'Sofitel',
        description: 'Opposite upscale shopping at the Beverly Center, this high-end, contemporary hotel is 1.6 miles from Los Angeles County Museum of Art and 4 miles from TCL Chinese Theatre.',
        price: 225,
      },
      {
        ownerId: 3,
        address: '9882 S Santa Monica Blvd',
        city: 'Beverly Hills',
        state: 'California',
        country: 'United States of America',
        lat: 34.06611,
        lng: -118.41084,
        name: 'Waldorf',
        description: 'Surrounded by tropical gardens on a stylish shopping street, this upscale hotel is 3 miles from Los Angeles County Museum of Art and 5 miles from the Hollywood Walk of Fame.',
        price: 1060,
      },
      {
        ownerId: 3,
        address: '101 Wilshire Blvd',
        city: 'Santa Monica',
        state: 'California',
        country: 'United States of America',
        lat: 34.01803,
        lng: -118.50157,
        name: 'Miramar',
        description: 'Established in 1921, this storied, high-end hotel overlooking the Pacific Ocean is less than a mile from Santa Monica Pier and 8 miles from Getty Center art museum.',
        price: 500,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options,{},{})
  }
};
