const route = require('express').Router()

route.get('/login', function(req,res){
    res.render('login', {
        role: 'doctor'
    })
})

route.post(`/login`, function (req, res) {
    Doctor.findAll({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then((result) => {
        let a = result.length
        
        req.session.user = {
            userId: result[0].id
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


module.exports = route