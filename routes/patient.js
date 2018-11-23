const route = require('express').Router()
let ControllerPatient = require(`../controllers/controllerPatient`)
let Model = require(`../models`)
let Patient = Model.Patient
const { encrypt, compareHash } = require('../helpers')
let checkAccess = require(`../middleware/middlewarePatient`)


route.get('/login', ControllerPatient.login)

route.post(`/login`, function (req, res) {
    Model.Patient.findAll({
        where: {
            email: req.body.email
        }
    }).then(result => {
        // console.log(result)
        if(result){
            req.session.user = {
                userId: result[0].id,
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                email: result[0].email,
                gender: result[0].gender,
                type: "patient"
            }
            if(compareHash(req.body.password, result[0].password)){
                res.redirect(`/patient/viewDetail`)
            } else {
                req.session.user = null
                res.redirect(`/patient/login?msg=3`)
            }
        }else{
            res.redirect(`/patient/login?msg=3`)
        }
        }).catch(err => {
            req.session.user = null
            res.redirect(`/patient/login?msg=3`)
    });
})

//VIEW DATA
route.get(`/viewDetail`,checkAccess, function (req, res) {
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
        id: req.params.dokterId,
        q: req.query.msg
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

//SIGNUP
route.get(`/signup`, ControllerPatient.signup)

route.post(`/signup`, function(req, res) {
    Patient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encrypt(req.body.password),
        gender: req.body.gender,
        role: "patient",
        createdAt: new Date(),
        updatedAt: new Date()
    }).then((result) => {
        res.redirect(`/patient/login`)
    }).catch((err) => {
        res.send(err)
    });
})

module.exports = route