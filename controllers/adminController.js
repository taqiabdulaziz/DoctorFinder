const Model = require('../models')
const {encrypt, compareHash} = require('../helpers')

class adminController {

    static login(req,res){
        Model.Admin.findOne({
            where: { email: req.body.email }
        })
        .then(result => {
            if(result){
                console.log("masuk sini????")
                req.session.user = {
                    adminId: result.id,
                    email: result.email,
                    type: "admin"
                }
                if(compareHash(req.body.password, result.password)){
                    console.log("masuk gakkkkk????")
                    res.redirect('/admin/')
                }
            }else{
                throw new Error(`Email tidak ditemukan`)
            }
        })
        .catch(err => {
            res.send(err)
        });
    }

    static logout(req,res) {
        req.session.user = null
        res.redirect('/')
    }

    static listDoctor(req,res){
        let dataDoctors = []
        if(req.session.user == undefined){
            res.redirect('/')
        }

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
                password: encrypt(req.body.password),
                SpecialistId : specialist.id,
                gender: req.body.gender,
            })
        })
        .then(data=>{
            console.log("masuk sini ==========")
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
            console.log("masukkk")
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

    static formSpecialist(req,res){
        res.render('admin/specialist-add')
    }

    static addSpecialist(req,res){
        Model.Specialist.create({
            specialistName: req.body.name 
        })
        .then(success=>{
            res.redirect('/admin')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static signup(req, res) {
        res.render(`admin/signup.ejs`, {
            q: undefined
        })
    }

    static executeSignup(req, res) {
        Model.Admin.create({
            email: req.body.email,
            role: req.body.email,
            password: encrypt(req.body.password)
        }).then((result) => {
            res.redirect(`/admin/login`)
        }).catch((err) => {
            res.send(err)
        });
    }

}

module.exports = adminController