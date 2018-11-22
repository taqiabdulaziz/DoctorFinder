const route = require('express').Router()
const Model = require('../models')
const ControllerPatient = require(`../controllers/controllerPatient`)

route.get('/', function (req, res) {
    Model.Appointment.findAll({
        include: [{
            model: Model.Doctor
        }, {
            model: Model.Patient
        }]
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    });
})

module.exports = route