'use strict';
module.exports = (sequelize, DataTypes) => {
  const Specialist = sequelize.define('Specialist', {
    specialistName: DataTypes.STRING
  }, {});
  Specialist.associate = function(models) {
      Specialist.hasMany(models.Doctor)
  };
  return Specialist;
};