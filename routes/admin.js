const route = require('express').Router()
const adminController = require('../controllers/adminController')

route.get('/', adminController.listDoctor)

route.get('/login', adminController.login)

route.get('/add', adminController.formAdd)

route.post('/add', adminController.addDoctor)

route.get('/edit/:id',adminController.formEdit)

route.post('/edit/:id', adminController.editDoctor)

route.get('/delete/:id', adminController.deleteDoctor)

module.exports = route