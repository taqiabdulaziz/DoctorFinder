const Model = require('../models')

class adminController {
    static listDoctor(req,res){
        let dataDoctors = []
        Model.Doctor.findAll({
            include:[{
                model: Model.Specialist
            }]
        })
        .then(doctors=>{
            // console.log(doctors)
            dataDoctors = doctors
            return Model.Specialist.findAll()
        })
        .then(specialists=>{
            res.render('admin/index',{
                data : dataDoctors,
                specialists : specialists
            })
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static formAdd(req,res){
        Model.Specialist.findAll()
        .then(specialists=>{
            res.render('admin/add-doctor',{
                specialists : specialists
            })
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addDoctor(req,res){
        Model.Specialist.findOne({where:{
            specialistName : req.body.specialist
        }})
        .then(specialist=>{
            return Model.Doctor.create({
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                SpecialistId : specialist.id,
                gender: req.body.gender,
            })
        })
        .then(data=>{
            res.redirect('/admin')
        })
        .catch(err=>{
            res.redirect(err)
        })
    }
    static formEdit(req, res){
        let id = req.params.id
        let dataDoctor = []
        console.log(id)
        Model.Doctor.findById(id,{
            include: {
                model: Model.Specialist
            }
        })
        .then(doctor=>{
            dataDoctor = doctor
            return Model.Specialist.findAll()
        })
        .then(specialist=>{
            res.render('admin/edit-doctor', {
                data: dataDoctor,
                specialists: specialist
            })
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static editDoctor(req,res){
        let id = req.params.id
        Model.Specialist.findOne({where:{
            specialistName : req.body.specialist
        }})
        .then(specialist=>{
            let input = { 
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                SpecialistId : specialist.id,
                gender: req.body.gender,
            }
            return Model.Doctor.update(input, {where:{id}})
        })
        .then(succes=>{
            res.redirect('/admin/')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static deleteDoctor(req,res){
        const id = req.params.id
        Model.Doctor.destroy({
            where:{id}
        })
        .then(success=>{
            res.redirect('/admin/')
        })
        .catch(err => {
            res.send(err)
        })
    }

}

module.exports = adminController