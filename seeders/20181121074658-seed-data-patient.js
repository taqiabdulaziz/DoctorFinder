'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Patients', [{
        firstName: 'Arnold',
        lastName: 'Herold',
        email: 'arnoldherold@mail.com',
        password: 'arnold',
        gender: 'male',
        role: 'patient',
        createdAt : new Date(),
        updatedAt  : new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Patients', null, {});
  }
};
