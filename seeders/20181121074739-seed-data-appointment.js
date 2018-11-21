'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Appointments', [{
      PatientId: 1,
      DoctorId: 2,
      date: new Date(),
      disease: 'Sakit Lambung',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Appointments', null, {});
}
};
