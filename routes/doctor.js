const route = require('express').Router()

route.get('/login', function(req,res){
    res.render('login', {
        role: 'doctor'
    })
})

module.exports = route