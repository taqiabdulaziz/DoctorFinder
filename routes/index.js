const route = require('express').Router()
const Model = require('../models')
const ControllerPatient = require(`../controllers/controllerPatient`)

route.get('/', function (req, res) {
    res.render('index')
})

module.exports = route