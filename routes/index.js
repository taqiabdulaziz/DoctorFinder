const route = require('express').Router()

route.get('/', function(req,res) {
    res.send('test')
})

module.exports = route