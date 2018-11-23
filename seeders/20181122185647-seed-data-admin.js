'use strict';
const {encrypt} = require('../helpers/index')

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Admins', [{
        email: 'admin@mail.com',
        password: encrypt("admin"),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Admins', null, {});
  }
};
