const route = require('express').Router()
let ControllerPatient = require(`../controllers/controllerPatient`)
let Model = require(`../models`)
let Patient = Model.Patient


route.get('/login', ControllerPatient.login)

route.post(`/login`, function (req, res) {
    Patient.findAll({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then((result) => {
        let a = result.length
        
        req.session.user = {
            userId: result[0].id,
            type: "patient"
        }
        
        if (a == 0) {
            res.redirect(`/patient/login?msg=1`)
        } else {
            res.redirect(`/patient/viewDetail`)
        }
    }).catch((err) => {
        res.send(err)
    });
})

//VIEW DATA
route.get(`/viewDetail`, function(req, res) {
    ControllerPatient.viewDetail(req, res)
//    res.send(req.session)
})

//MAKE APPOINTMENT
route.get(`/makeAppointment`, function (req, res) {
    if (!req.session.user) {
        res.redirect(`/patient/login`)
    }
    ControllerPatient.makeAppointment(req, res)
})

//MAKE APPOINTMENT
route.get(`/executeAppointment/:dokterId`, function (req, res) {
    if (!req.session.user) {
        res.redirect(`/patient/login`)
    }
    res.render(`patient/makeAppointment.ejs`, {
        id: req.params.dokterId
    })
})

route.post(`/executeAppointment/:dokterId`, function (req, res) {
    if (!req.session.user) {
        res.redirect(`/patient/login`)
    }
    ControllerPatient.createAppointment(req, res)
})

route.get(`/logout`, function (req, res) {
    req.session.user = null
    res.redirect(`/patient/login`)
})

module.exports = route