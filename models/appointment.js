'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    PatientId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    disease: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Appointment.associate = function(models) {
      Appointment.belongsTo(models.Doctor)
      Appointment.belongsTo(models.Patient)
  };
  return Appointment;
};