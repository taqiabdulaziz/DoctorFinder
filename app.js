const express = require('express')
const app = express()
app.use(express.urlencoded({extended : false}))
app.set("view engine", "ejs")

const home = require('./routes/index')
// const doctor = require('./routes/doctor')
// const patient = require('./routes/patient')

app.use('/', home)

app.listen(3000, function(){
    console.log("Listening port: 3000")
})