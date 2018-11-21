'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Specialists', [{
      specialistName: 'Anak',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      specialistName: 'Cardiology',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Specialists', null, {});
  }
};
