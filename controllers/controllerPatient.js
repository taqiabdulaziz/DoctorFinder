let Model = require(`../models`)
let Patient = Model.Patient


class ControllerPatient {

    static login(req, res) {
        res.render('login', {
            role: 'patient'
        })
    }

    static viewDetail(req, res) {
        Model.Appointment.findAll({
            include: {
                model: Model.Doctor
            },
            where: {
                PatientId: req.session.user.id
            }
        }).then((result) => {
            res.render(`patient/patientDetails.ejs`, {
                result: result
            })
            
        }).catch((err) => {
            res.send(err)
        });
    }

    static makeAppointment(req, res) {
        Model.Doctor.findAll({
            include: {
                model: Model.Specialist
            },
            where: {
                SpecialistId: req.query.msg
            }
        }).then((result) => {
            res.render(`patient/listDokter.ejs`, {
                msg: req.query.msg,
                doctorList: result
            })    
        }).catch((err) => {
            res.send(err)
        });
    }

    static createAppointment(req, res) {
        Model.Appointment.create({
            disease: req.body.keluhan,
            createdAt: new Date(),
            date: req.body.date,
            DoctorId: req.params.dokterId,
            status: false
        }).then((result) => {
            res.redirect(`/patient/viewDetail`)
        }).catch((err) => {
            res.send(err)
        });
    }

}

module.exports = ControllerPatient