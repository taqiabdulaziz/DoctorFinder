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
      },{
        firstName: 'Abed',
        lastName: 'nego',
        email: 'abednego@mail.com',
        password: 'abednego',
        gender: 'male',
        role: 'patient',
        createdAt : new Date(),
        updatedAt  : new Date()
      },{
        firstName: 'Taqi',
        lastName: 'Muhammad',
        email: 'mtaqi@mail.com',
        password: 'taqi',
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
