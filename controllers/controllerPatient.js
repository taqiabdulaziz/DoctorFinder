let Model = require(`../models`)
let Patient = Model.Patient


class ControllerPatient {

    static login(req, res) {
        res.render('login', {
            role: 'patient',
            q: req.query.msg
        })
    }

    static viewDetail(req, res) {
        if (!req.session.user) {
            res.redirect(`/patient/login`)
        }
        Model.Appointment.findAll({
            include: {
                model: Model.Doctor
            },
            where: {
                PatientId: req.session.user.userId
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
            PatientId: req.session.user.userId,
            DoctorId: req.params.dokterId,
            status: false
        }).then((result) => {
            res.redirect(`/patient/viewDetail`)
        }).catch((err) => {
            switch (err.errors[0].message) {
                case "Validation notEmpty on disease failed":
                    res.redirect(`/patient/executeAppointment/${req.session.user.userId}?msg=1`)
                    break;
            
                case "Validation notEmpty on date failed":
                res.redirect(`/patient/executeAppointment/${req.session.user.userId}?msg=2`)
                    break;
            }
            
        });
    }

    static signup(req, res) {
        res.render(`patient/signup.ejs`, {
            q: undefined
        })
    }

}

module.exports = ControllerPatient