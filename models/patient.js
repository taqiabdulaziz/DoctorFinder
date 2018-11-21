'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Patient.associate = function(models) {
    Patient.belongsToMany(models.Doctor, {
      through: "Appointment"
    })
  };
  return Patient;
};