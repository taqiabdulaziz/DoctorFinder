const route = require('express').Router()
const ControllerDoctor = require('../controllers/controllerDoctor')

route.get('/', ControllerDoctor.profile)

route.get('/login', function(req,res){
    res.render('login', {
        role: 'doctor',
        q: req.query.msg
    })
})
route.post(`/login`, ControllerDoctor.login)

route.get('/schedule', ControllerDoctor.allSchedule)
route.get('/logout', ControllerDoctor.logout)
route.get('/approve/:idAppointment', ControllerDoctor.approve)


module.exports = route