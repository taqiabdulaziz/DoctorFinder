const route = require('express').Router()
const ControllerDoctor = require('../controllers/controllerDoctor')



route.get('/', function(req,res){
    res.render('doctor/index')
})
route.get('/login', function(req,res){
    res.render('login', {
        role: 'doctor',
        q: undefined
    })
})
route.post('/login', ControllerDoctor.login)

route.get('/schedule', ControllerDoctor.allSchedule)


module.exports = route