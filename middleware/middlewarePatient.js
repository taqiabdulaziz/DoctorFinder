let checkaccess = function(req, res, next) {
    if (req.session.patientData != null) {
        next()
    } else {
        res.redirect()
    }   
}


module.exports = checkaccess