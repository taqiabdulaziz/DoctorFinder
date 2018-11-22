'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Admins', 'role', { type: Sequelize.STRING, defaultValue: 'Admin'});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Admins', 'role', { type: Sequelize.STRING});
  }
};
