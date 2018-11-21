'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Doctors', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
      gender: 'Male',
      role: 'Doctor',
      SpecialistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Robert',
      lastName: 'Downey',
      email: 'ironman@gmail.com',
      password: 'password',
      gender: 'Male',
      role: 'Doctor',
      SpecialistId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Doctors', null, {});
  }
};
