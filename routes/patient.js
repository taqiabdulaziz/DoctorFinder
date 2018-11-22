const route = require('express').Router()
let ControllerPatient = require(`../controllers/controllerPatient`)
let Model = require(`../models`)
const {compareHash} = require('../helpers')
let Patient = Model.Patient

route.get('/login',ControllerPatient.login)

route.post(`/login`, function (req, res) {
    Patient.findAll({
        where: {
            email: req.body.email
        }
    }).then((result) => {
        let a = result.length
        
        req.session.user = {
            userId: result[0].id
        }
        
        if (a == 0) {
            res.redirect(`/patient/login?msg=1`)
        } else {
            if(compareHash(req.body.password, result.password)){
                res.redirect(`/patient/viewDetail`)
            }else{
                res.redirect(`/patient/login?msg=2`)
            }
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
    ControllerPatient.makeAppointment(req, res)
})

//MAKE APPOINTMENT
route.get(`/executeAppointment/:dokterId`,function(req, res) {
    res.render(`patient/makeAppointment.ejs`, {
        id: req.params.dokterId
    })
})

route.post(`/executeAppointment/:dokterId`, function(req, res) {
    ControllerPatient.createAppointment(req, res)
})

module.exports = route