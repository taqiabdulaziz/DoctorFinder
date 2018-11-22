'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PatientId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    disease: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    status: DataTypes.BOOLEAN
  }, {});
  Appointment.associate = function(models) {
      Appointment.belongsTo(models.Doctor)
      Appointment.belongsTo(models.Patient)
  };
  return Appointment;
};