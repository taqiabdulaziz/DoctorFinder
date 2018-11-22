'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Patients', 'role', { type: Sequelize.STRING, defaultValue: 'Patient'});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Patients', 'role', { type: Sequelize.STRING});
  }
};
