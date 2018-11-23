let checkaccess = function (req, res, next) {
    if (!req.session.user) {
        res.redirect(`/patient/login`)
    } else {
        next()
    }

}


module.exports = checkaccess