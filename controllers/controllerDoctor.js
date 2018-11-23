const Model = require('../models')
const {compareHash} = require('../helpers')

class ControllerDoctor {
    static login(req,res){
        Model.Doctor.findOne({
            where: { email: req.body.email }
        })
        .then(result => {
            if(result){
                req.session.user = {
                    doctorId: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    gender: result.gender,
                    SpecialistId: result.SpecialistId,
                    type: "doctor"
                }
                if(compareHash(req.body.password, result.password)){
                    res.redirect('/doctor/')
                }
            }else{
                throw new Error(`Email tidak ditemukan`)
            }
        })
        .catch(err => {
            res.send(err)
        });
    }

    static profile(req,res) {
        Model.Doctor.findOne({
            where:{
                id: req.session.user.doctorId
            }
        })
        .then(sucess=>{
            res.render('doctor/index',{
                dataDoctor: sucess
            })
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static allSchedule(req,res){
        Model.Appointment.findAll({ 
            where : {
                DoctorId: req.session.user.doctorId
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

    static approve(req,res){
        Model.Appointment.findOne({
            where:{
                id : req.params.idAppointment
            }
        })
        .then(appointment=>{
            return appointment.update({
                status : true
            })
        })
        .then(success=>{
            res.redirect('/doctor/schedule')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static logout(req,res) {
        req.session.user = null
        res.redirect(`/`)
    }
}

module.exports = ControllerDoctor