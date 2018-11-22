const express = require('express')
const app = express()
app.use(express.urlencoded({extended : false}))
app.set("view engine", "ejs")

let middlewarePatient = require(`./middleware/middlewarePatient.js`)
const expressSession = require('express-session');
const home = require('./routes/index')
const doctor = require('./routes/doctor')
const patient = require('./routes/patient')
const admin = require('./routes/admin')

app.use(expressSession({ secret: "waduh" }))
app.use(function(req, res, next) {
    if (req.session.user) {
        app.locals.session = req.session
    } else {
        app.locals.session = ""
    }
    next()
})
app.use('/', home)
app.use('/admin', admin)
app.use('/doctor', doctor)
app.use('/patient', patient)


app.listen(3000, function(){
    console.log("Listening port: 3000")
})