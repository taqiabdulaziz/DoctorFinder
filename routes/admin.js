const route = require('express').Router()
const adminController = require('../controllers/adminController')

route.get('/', adminController.listDoctor)

route.get('/login', function(req,res){
    res.render('login', {
            role: 'admin',
            q: req.query.msg
    })
})
route.post('/login', adminController.login)
route.get('/logout', adminController.logout)

route.get('/add', adminController.formAdd)
route.post('/add', adminController.addDoctor)

route.get('/edit/:id',adminController.formEdit)
route.post('/edit/:id', adminController.editDoctor)

route.get('/delete/:id', adminController.deleteDoctor)

route.get('/add/specialist', adminController.formSpecialist)
route.post('/add/specialist', adminController.addSpecialist)

route.get(`/signup`, adminController.signup)
route.post(`/signup`, adminController.executeSignup)

module.exports = route