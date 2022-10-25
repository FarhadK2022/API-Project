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
        hashedPassword: bcrypt.hashSync('password1'),
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
      {
        firstName: 'Natalie',
        lastName: 'Shaghafi',
        username: 'NatShag',
        hashedPassword: bcrypt.hashSync('password5'),
        email: 'nat@user.io',
      },
      {
        firstName: 'Natasha',
        lastName: 'Qabazard',
        username: 'Tashi',
        hashedPassword: bcrypt.hashSync('password6'),
        email: 'natasha@user.io',
      },
      {
        firstName: 'Jade',
        lastName: 'Rose',
        username: 'SunnyD',
        hashedPassword: bcrypt.hashSync('password7'),
        email: 'jade@user.io',
      },
      {
        firstName: 'Johnny',
        lastName: 'Football',
        username: 'Browns',
        hashedPassword: bcrypt.hashSync('password8'),
        email: 'johnny@user.io',
      },
      {
        firstName: 'Natalie',
        lastName: 'Mauch',
        username: 'Mauch1',
        hashedPassword: bcrypt.hashSync('password9'),
        email: 'natalie@user.io',
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
       username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
     }, {});
  }
};
