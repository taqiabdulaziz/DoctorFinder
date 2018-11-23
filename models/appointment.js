'use strict';
var nodemailer = require('nodemailer');

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
  }, {hooks:{
    afterUpdate : (data, options) =>{
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gamecowo12345@gmail.com',
          pass: 'gamecowo54321'
        }
      });
      var mailOptions = {
        from: 'gamecowo12345@gmail.com',
        to: 'lubisabednego@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      return transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
    }
  }});
  Appointment.associate = function(models) {
      Appointment.belongsTo(models.Doctor)
      Appointment.belongsTo(models.Patient)
  };
  return Appointment;
};