'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Doctors', 'role', {type: Sequelize.STRING, defaultValue: 'Doctor'});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Doctors', 'role', {type: Sequelize.STRING});
  }
};
