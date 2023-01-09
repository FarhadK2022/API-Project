'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
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
        firstName: 'Tony',
        lastName: 'Deluca',
        username: 'TrashMaster',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'tony@user.io',
      },
      {
        firstName: 'Douglas',
        lastName: 'Wagner',
        username: 'Wags',
        hashedPassword: bcrypt.hashSync('password1'),
        email: 'doug@user.io',
      },
      {
        firstName: 'Malachi',
        lastName: 'Wayne',
        username: 'BabyBoi',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'boobooz@user.io',
      },
      {
        firstName: 'Michael',
        lastName: 'Bolstad',
        username: 'Boss',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'mike@user.io',
      },
      {
        firstName: 'Kevin',
        lastName: 'Wagner',
        username: 'Wagner1',
        hashedPassword: bcrypt.hashSync('password4'),
        email: 'kevin@user.io',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete(options, {
       username: { [Op.in]: ['TrashMaster', 'Wags', 'BabyBoi', 'Boss', 'Wagner1'] }
     }, {});
  }
};
