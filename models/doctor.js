'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: DataTypes.STRING,
    SpecialistId: DataTypes.INTEGER
  }, {});
  Doctor.associate = function(models) {
      Doctor.belongsTo(models.Specialist)
      Doctor.belongsToMany(models.Patient,{through: "Appointment"})
  };
  return Doctor;
};