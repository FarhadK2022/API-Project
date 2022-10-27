'use strict';
const bcrypt = require("bcryptjs");
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
     return queryInterface.bulkInsert('Users', [
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Users', {
       username: { [Op.in]: ['TrashMaster', 'Wags', 'BabyBoi', 'Boss', 'Wagner1'] }
     }, {});
  }
};
