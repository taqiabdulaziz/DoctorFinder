const Model = require('../models')
const {compareHash} = require('../helpers')

class ControllerDoctor {
    static login(req,res){
        Model.Doctor.findOne({
            where: { email: req.body.email }
        })
        .then(result => {
            if(result){
                console.log(result)
                req.session.user = {
                    userDoctor: result.id,
                    q: undefined
                }
                if(compareHash(req.body.password, result.password)){
                    res.redirect('/doctor/schedule')
                }
            }else{
                throw new Error(`Email tidak ditemukan`)
            }
        })
        .catch(err => {
            res.send(err)
        });
    }

    static allSchedule(req,res){
        Model.Appointment.findAll({ 
            where : {
                DoctorId: req.session.user.userDoctor
            },
            include:[{
                model: Model.Patient
            },{
                model: Model.Doctor
            }]
        })
        .then(appointments=>{
            // res.send(appointments)
            res.render('doctor/schedule-list',{
                dataAppointments : appointments
            })
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports = ControllerDoctor