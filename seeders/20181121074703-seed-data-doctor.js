'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Doctors', [{
      firstName: 'Aziz',
      lastName: 'Abdul',
      email: 'waduh@gmail.com',
      password: 'password',
      gender: 'Male',
      role: 'Doctor',
      SpecialistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
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
      firstName: 'Arnold',
      lastName: 'Herod',
      email: 'arnoldherod@gmail.com',
      password: 'password',
      gender: 'Male',
      role: 'Doctor',
      SpecialistId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Jeremy',
      lastName: 'Tety',
      email: 'jety@gmail.com',
      password: 'password',
      gender: 'Male',
      role: 'Doctor',
      SpecialistId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Doctors', null, {});
  }
};
