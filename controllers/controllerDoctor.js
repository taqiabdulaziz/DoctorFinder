const Model = require('../models')
const {compareHash} = require('../helpers')

class ControllerDoctor {
    static login(req,res){
        Model.Doctor.findOne({
            where: { email: req.body.email }
        })
        .then(result => {
            console.log(result)
            if(result){
                if(compareHash(req.body.password, result.password)){
                    res.redirect('/doctor')
                }
            }else{
                throw new Error(`Email tidak ditemukan`)
            }
        })
        .catch(err => {
            res.send(err)
        });
    }

    static schedule(req,res){
        
    }
}

module.exports = ControllerDoctor